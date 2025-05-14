const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { authenticateToken } = require('../middlewares');

// Initiate STK Push
router.post('/stk-push', authenticateToken, paymentController.initiateSTKPush);

// Handle M-Pesa callback
router.post('/callback', paymentController.handleCallback);

// Get payment status
router.get('/status/:paymentId', authenticateToken, paymentController.getPaymentStatus);

// Get payment history
router.get('/history', authenticateToken, paymentController.getPaymentHistory);

module.exports = router; 