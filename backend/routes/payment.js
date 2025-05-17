import express from 'express';
import jwt from 'jsonwebtoken';
import { query } from '../db/index.js';

const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

// Initiate payment
router.post('/initiate', authenticateToken, async (req, res) => {
    try {
        const { amount, phoneNumber } = req.body;
        const userId = req.user.userId;

        // Generate a unique checkout request ID
        const checkoutRequestId = `REQ-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        // Create payment record
        const result = await query(
            'INSERT INTO payments (user_id, amount, phone_number, checkout_request_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [userId, amount, phoneNumber, checkoutRequestId]
        );

        res.status(201).json({
            message: 'Payment initiated successfully',
            payment: {
                id: result.rows[0].id,
                amount: result.rows[0].amount,
                phoneNumber: result.rows[0].phone_number,
                checkoutRequestId: result.rows[0].checkout_request_id,
                status: result.rows[0].status
            }
        });
    } catch (error) {
        console.error('Payment initiation error:', error);
        res.status(500).json({ error: 'Error initiating payment' });
    }
});

// Get payment status
router.get('/status/:checkoutRequestId', authenticateToken, async (req, res) => {
    try {
        const { checkoutRequestId } = req.params;
        const userId = req.user.userId;

        const result = await query(
            'SELECT * FROM payments WHERE checkout_request_id = $1 AND user_id = $2',
            [checkoutRequestId, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        res.json({
            payment: {
                id: result.rows[0].id,
                amount: result.rows[0].amount,
                phoneNumber: result.rows[0].phone_number,
                checkoutRequestId: result.rows[0].checkout_request_id,
                status: result.rows[0].status,
                createdAt: result.rows[0].created_at
            }
        });
    } catch (error) {
        console.error('Payment status error:', error);
        res.status(500).json({ error: 'Error getting payment status' });
    }
});

// Get payment history
router.get('/history', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;

        const result = await query(
            'SELECT * FROM payments WHERE user_id = $1 ORDER BY created_at DESC',
            [userId]
        );

        res.json({
            payments: result.rows.map(payment => ({
                id: payment.id,
                amount: payment.amount,
                phoneNumber: payment.phone_number,
                checkoutRequestId: payment.checkout_request_id,
                status: payment.status,
                createdAt: payment.created_at
            }))
        });
    } catch (error) {
        console.error('Payment history error:', error);
        res.status(500).json({ error: 'Error getting payment history' });
    }
});

export default router; 