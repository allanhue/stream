import { initiateMpesaPayment, confirmMpesaPayment } from '../services/mpesaService.js';

export const initiatePayment = async (req, res) => {
    try {
        const { amount, phoneNumber } = req.body;
        const userId = req.user.id;

        const payment = await initiateMpesaPayment({
            amount,
            phoneNumber,
            userId
        });

        res.json({
            success: true,
            data: payment
        });
    } catch (error) {
        console.error('Payment initiation error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to initiate payment'
        });
    }
};

export const confirmPayment = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const userId = req.user.id;

        const confirmation = await confirmMpesaPayment(paymentId, userId);

        res.json({
            success: true,
            data: confirmation
        });
    } catch (error) {
        console.error('Payment confirmation error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to confirm payment'
        });
    }
};

export const getPaymentStatus = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const userId = req.user.id;

        // Implement payment status check logic
        res.json({
            success: true,
            data: {
                status: 'pending',
                paymentId
            }
        });
    } catch (error) {
        console.error('Payment status check error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get payment status'
        });
    }
};

export const getPaymentHistory = async (req, res) => {
    try {
        const userId = req.user.id;

        // Implement payment history retrieval logic
        res.json({
            success: true,
            data: []
        });
    } catch (error) {
        console.error('Payment history error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get payment history'
        });
    }
}; 