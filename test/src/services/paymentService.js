import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const paymentService = {
    initiatePayment: async (phoneNumber, amount, planType) => {
        try {
            const response = await axios.post(`${API_URL}/payments/stk-push`, {
                phoneNumber,
                amount,
                planType
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Payment initiation failed');
        }
    },

    getPaymentStatus: async (paymentId) => {
        try {
            const response = await axios.get(`${API_URL}/payments/status/${paymentId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Failed to get payment status');
        }
    },

    getPaymentHistory: async () => {
        try {
            const response = await axios.get(`${API_URL}/payments/history`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Failed to get payment history');
        }
    }
}; 