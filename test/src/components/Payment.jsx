import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    
    const selectedPackage = location.state?.selectedPackage;
    const packagePrices = {
        basic: 999, // KES 999
        standard: 1499,
        premium: 1999
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post('/api/payment/initiate-payment', {
                phoneNumber,
                amount: packagePrices[selectedPackage]
            });

            if (response.data.success) {
                // Show success message
                alert('Please check your phone to complete the payment');
            } else {
                setError('Payment initiation failed. Please try again.');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6">Complete Payment</h2>
            {error && (
                <div className="bg-red-500 text-white p-3 rounded mb-4">
                    {error}
                </div>
            )}
            <form onSubmit={handlePayment}>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">
                        Phone Number (254XXXXXXXXX)
                    </label>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="254XXXXXXXXX"
                        className="w-full p-2 rounded bg-gray-700 text-white"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    {isLoading ? 'Processing...' : 'Pay Now'}
                </button>
            </form>
        </div>
    );
};

export default Payment; 