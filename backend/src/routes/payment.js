import express from 'express';
import { authenticateToken } from '../../middlewares.js';
import { 
    initiatePayment,
    confirmPayment,
    getPaymentStatus,
    getPaymentHistory
} from '../controllers/paymentController.js';

const router = express.Router();

// Payment routes
router.post('/initiate', authenticateToken, initiatePayment);
router.post('/confirm', authenticateToken, confirmPayment);
router.get('/status/:paymentId', authenticateToken, getPaymentStatus);
router.get('/history', authenticateToken, getPaymentHistory);

export default router; 