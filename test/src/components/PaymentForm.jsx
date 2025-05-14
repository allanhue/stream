import React, { useState } from 'react';
import { paymentService } from '../services/paymentService';
import { useAuth } from '../contexts/AuthContext';

const PaymentForm = ({ amount, onSuccess, onError }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { user } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Format phone number if needed
            const formattedPhone = phoneNumber.startsWith('254') 
                ? phoneNumber 
                : `254${phoneNumber.replace(/^0+/, '')}`;

            const response = await paymentService.initiatePayment(formattedPhone, amount);
            
            if (response.success) {
                onSuccess?.(response.data);
            } else {
                throw new Error(response.error || 'Payment initiation failed');
            }
        } catch (err) {
            setError(err.message);
            onError?.(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">M-Pesa Payment</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="e.g., 254XXXXXXXXX"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                    <p className="mt-1 text-sm text-gray-500">
                        Enter your M-Pesa registered phone number
                    </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-600">Amount to Pay:</p>
                    <p className="text-xl font-semibold text-gray-800">KES {amount}</p>
                </div>

                {error && (
                    <div className="text-red-600 text-sm">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                        ${loading 
                            ? 'bg-blue-400 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        }`}
                >
                    {loading ? 'Processing...' : 'Pay with M-Pesa'}
                </button>
            </form>

            <div className="mt-4 text-sm text-gray-500">
                <p>You will receive an M-Pesa prompt on your phone to complete the payment.</p>
            </div>
        </div>
    );
};

export default PaymentForm; 