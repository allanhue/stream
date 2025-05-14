const axios = require('axios');
const crypto = require('crypto');
const { pool } = require('../db');
const subscriptionService = require('../services/subscriptionService');

// Generate timestamp in the required format
const generateTimestamp = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}${hour}${minutes}${seconds}`;
};

// Generate password for M-Pesa API
const generatePassword = (shortcode, passkey, timestamp) => {
    const str = shortcode + passkey + timestamp;
    return Buffer.from(str).toString('base64');
};

exports.initiateSTKPush = async (req, res) => {
    try {
        const { phoneNumber, amount, planType } = req.body;
        const userId = req.user.id;
        
        // Format phone number to include country code if not present
        const formattedPhone = phoneNumber.startsWith('254') ? phoneNumber : `254${phoneNumber.replace(/^0+/, '')}`;
        
        const timestamp = generateTimestamp();
        const password = generatePassword(
            process.env.MPESA_BUSINESS_SHORT_CODE,
            process.env.MPESA_PASSKEY,
            timestamp
        );

        const stkPushPayload = {
            BusinessShortCode: process.env.MPESA_BUSINESS_SHORT_CODE,
            Password: password,
            Timestamp: timestamp,
            TransactionType: "CustomerPayBillOnline",
            Amount: amount,
            PartyA: formattedPhone,
            PartyB: process.env.MPESA_BUSINESS_SHORT_CODE,
            PhoneNumber: formattedPhone,
            CallBackURL: `${process.env.BASE_URL}/api/payments/callback`,
            AccountReference: "LanPrime Subscription",
            TransactionDesc: "Subscription Payment"
        };

        const response = await axios.post(
            process.env.MPESA_BASE_URL,
            stkPushPayload,
            {
                headers: {
                    'Authorization': `Bearer ${req.mpesaAccessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Save payment record
        const paymentResult = await pool.query(
            `INSERT INTO payments (user_id, amount, phone_number, transaction_id, status, payment_type)
             VALUES ($1, $2, $3, $4, 'pending', 'mpesa')
             RETURNING *`,
            [userId, amount, formattedPhone, response.data.CheckoutRequestID]
        );

        res.json({
            success: true,
            data: {
                ...response.data,
                paymentId: paymentResult.rows[0].id
            }
        });
    } catch (error) {
        console.error('STK Push Error:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            error: error.response?.data?.errorMessage || 'Failed to initiate payment'
        });
    }
};

exports.handleCallback = async (req, res) => {
    try {
        const callbackData = req.body;
        const { Body: { stkCallback: { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc } } } = callbackData;
        
        // Update payment status
        const paymentResult = await pool.query(
            `UPDATE payments 
             SET status = $1, updated_at = NOW()
             WHERE transaction_id = $2
             RETURNING *`,
            [ResultCode === 0 ? 'completed' : 'failed', CheckoutRequestID]
        );

        if (ResultCode === 0 && paymentResult.rows[0]) {
            const payment = paymentResult.rows[0];
            
            // Create subscription if payment is successful
            const duration = payment.amount >= 1000 ? 30 : 7; // 30 days for premium, 7 days for basic
            const planType = payment.amount >= 1000 ? 'premium' : 'basic';
            
            await subscriptionService.createSubscription(
                payment.user_id,
                planType,
                duration
            );
        }
        
        res.json({ success: true });
    } catch (error) {
        console.error('Callback Error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to process callback'
        });
    }
};

exports.getPaymentStatus = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const result = await pool.query(
            `SELECT * FROM payments WHERE id = $1`,
            [paymentId]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Payment not found'
            });
        }

        res.json({
            success: true,
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Payment Status Error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get payment status'
        });
    }
};

exports.getPaymentHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await pool.query(
            `SELECT * FROM payments 
             WHERE user_id = $1 
             ORDER BY created_at DESC`,
            [userId]
        );

        res.json({
            success: true,
            data: result.rows
        });
    } catch (error) {
        console.error('Payment History Error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get payment history'
        });
    }
}; 