const express = require('express');
const router = express.Router();
const mpesaService = require('../services/mpesaService');
const { authenticateToken } = require('../middleware/auth');

router.post('/initiate-payment', authenticateToken, async (req, res) => {
    try {
        const { phoneNumber, amount, packageType } = req.body;
        const userId = req.user.id;

        // Validate phone number
        if (!phoneNumber.match(/^254\d{9}$/)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid phone number format'
            });
        }

        // Initiate STK push
        const paymentResponse = await mpesaService.initiateSTKPush(phoneNumber, amount);

        // Store payment request in database
        await db.payment.create({
            userId,
            packageType,
            amount,
            phoneNumber,
            checkoutRequestId: paymentResponse.CheckoutRequestID,
            status: 'pending'
        });

        res.json({
            success: true,
            data: paymentResponse
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;