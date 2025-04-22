import React, { useState } from 'react';
import { CreditCard, Shield, Zap, CheckCircle } from 'lucide-react';

const Payment = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: {
        monthly: '$9.99',
        yearly: '$99.99'
      },
      features: [
        'HD Streaming',
        '1 Device',
        'Basic Support',
        'Limited Content'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: {
        monthly: '$14.99',
        yearly: '$149.99'
      },
      features: [
        '4K Streaming',
        '4 Devices',
        'Priority Support',
        'All Content',
        'Offline Downloads'
      ],
      popular: true
    },
    {
      id: 'family',
      name: 'Family',
      price: {
        monthly: '$19.99',
        yearly: '$199.99'
      },
      features: [
        '4K Streaming',
        '6 Devices',
        '24/7 Support',
        'All Content',
        'Offline Downloads',
        'Kids Profile'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-2 text-center">
          Choose Your Plan
        </h1>
        <p className="text-gray-400 text-center mb-12">
          Start your free trial today and enjoy unlimited streaming
        </p>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-800 p-1 rounded-lg">
            <button
              onClick={() => setSelectedPlan('monthly')}
              className={`px-6 py-2 rounded-md transition-all ${
                selectedPlan === 'monthly'
                  ? 'bg-gradient-to-r from-blue-400 to-green-400 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setSelectedPlan('yearly')}
              className={`px-6 py-2 rounded-md transition-all ${
                selectedPlan === 'yearly'
                  ? 'bg-gradient-to-r from-blue-400 to-green-400 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Yearly (Save 20%)
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-gray-800 rounded-xl p-8 relative hover:shadow-lg hover:shadow-blue-500/10 transition-all ${
                plan.popular ? 'border-2 border-green-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-400 to-green-400 text-white text-sm px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                  {plan.price[selectedPlan]}
                </span>
                <span className="text-gray-400">/{selectedPlan === 'monthly' ? 'month' : 'year'}</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="w-full bg-gradient-to-r from-blue-400 to-green-400 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity shadow-lg hover:shadow-blue-500/20">
                Start Free Trial
              </button>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="mt-16 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-6">
            Payment Method
          </h2>
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-green-500 bg-gray-700 shadow-lg'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <CreditCard className="w-6 h-6 text-white mb-2" />
                <span className="text-white">Credit Card</span>
              </button>
              <button
                onClick={() => setPaymentMethod('paypal')}
                className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                  paymentMethod === 'paypal'
                    ? 'border-green-500 bg-gray-700 shadow-lg'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <Shield className="w-6 h-6 text-white mb-2" />
                <span className="text-white">PayPal</span>
              </button>
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 mb-2">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 mb-2">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>
            )}

            <button className="w-full mt-6 bg-gradient-to-r from-blue-400 to-green-400 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity shadow-lg hover:shadow-blue-500/20">
              Complete Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment; 