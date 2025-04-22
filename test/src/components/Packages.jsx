import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Packages = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handlePackageSelect = (packageType) => {
        if (!user) {
            navigate('/login', { 
                state: { 
                    redirectAfterAuth: '/payment',
                    selectedPackage: packageType,
                    message: 'Please sign in to continue with your subscription'
                }
            });
        } else {
            navigate('/payment', { 
                state: { selectedPackage: packageType } 
            });
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
            {/* Basic Package */}
            <div className="bg-gray-800 rounded-lg p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Basic</h3>
                <p className="text-gray-300 mb-6">Perfect for starters</p>
                <p className="text-4xl font-bold text-white mb-6">$9.99<span className="text-sm">/month</span></p>
                <button
                    onClick={() => handlePackageSelect('basic')}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Start Trial
                </button>
            </div>

            {/* Standard Package */}
            <div className="bg-gray-800 rounded-lg p-8 text-center border-2 border-blue-500">
                <h3 className="text-2xl font-bold text-white mb-4">Standard</h3>
                <p className="text-gray-300 mb-6">Most Popular</p>
                <p className="text-4xl font-bold text-white mb-6">$14.99<span className="text-sm">/month</span></p>
                <button
                    onClick={() => handlePackageSelect('standard')}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Start Trial
                </button>
            </div>

            {/* Premium Package */}
            <div className="bg-gray-800 rounded-lg p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Premium</h3>
                <p className="text-gray-300 mb-6">All features included</p>
                <p className="text-4xl font-bold text-white mb-6">$19.99<span className="text-sm">/month</span></p>
                <button
                    onClick={() => handlePackageSelect('premium')}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Start Trial
                </button>
            </div>
        </div>
    );
};

export default Packages;