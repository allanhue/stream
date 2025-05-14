import express from 'express';
import paymentRoutes from './payment.js';
import { authenticateToken } from '../middlewares.js';
import { register, login, getProfile, updateProfile } from '../controllers/authController.js';

const router = express.Router();

// Public routes
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Auth routes
router.post('/auth/register', register);
router.post('/auth/login', login);

// Protected routes
router.use('/payments', authenticateToken, paymentRoutes);
router.get('/auth/profile', authenticateToken, getProfile);
router.put('/auth/profile', authenticateToken, updateProfile);

// Add more route modules here as needed
// router.use('/movies', movieRoutes);
// router.use('/series', seriesRoutes);
// etc.

export default router; 