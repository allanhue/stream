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

// Create subscription
router.post('/create', authenticateToken, async (req, res) => {
    try {
        const { packageType } = req.body;
        const userId = req.user.userId;

        // Calculate end date based on package type
        const startDate = new Date();
        let endDate = new Date();
        
        switch (packageType) {
            case 'monthly':
                endDate.setMonth(endDate.getMonth() + 1);
                break;
            case 'yearly':
                endDate.setFullYear(endDate.getFullYear() + 1);
                break;
            default:
                return res.status(400).json({ error: 'Invalid package type' });
        }

        // Create subscription
        const result = await query(
            'INSERT INTO subscriptions (user_id, package_type, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING *',
            [userId, packageType, startDate, endDate]
        );

        res.status(201).json({
            message: 'Subscription created successfully',
            subscription: {
                id: result.rows[0].id,
                packageType: result.rows[0].package_type,
                startDate: result.rows[0].start_date,
                endDate: result.rows[0].end_date,
                status: result.rows[0].status
            }
        });
    } catch (error) {
        console.error('Subscription creation error:', error);
        res.status(500).json({ error: 'Error creating subscription' });
    }
});

// Get current subscription
router.get('/current', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;

        const result = await query(
            'SELECT * FROM subscriptions WHERE user_id = $1 AND status = $2 AND end_date > NOW() ORDER BY end_date DESC LIMIT 1',
            [userId, 'active']
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No active subscription found' });
        }

        res.json({
            subscription: {
                id: result.rows[0].id,
                packageType: result.rows[0].package_type,
                startDate: result.rows[0].start_date,
                endDate: result.rows[0].end_date,
                status: result.rows[0].status
            }
        });
    } catch (error) {
        console.error('Get subscription error:', error);
        res.status(500).json({ error: 'Error getting subscription' });
    }
});

// Get subscription history
router.get('/history', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;

        const result = await query(
            'SELECT * FROM subscriptions WHERE user_id = $1 ORDER BY created_at DESC',
            [userId]
        );

        res.json({
            subscriptions: result.rows.map(subscription => ({
                id: subscription.id,
                packageType: subscription.package_type,
                startDate: subscription.start_date,
                endDate: subscription.end_date,
                status: subscription.status,
                createdAt: subscription.created_at
            }))
        });
    } catch (error) {
        console.error('Subscription history error:', error);
        res.status(500).json({ error: 'Error getting subscription history' });
    }
});

export default router; 