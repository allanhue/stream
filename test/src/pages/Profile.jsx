import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock user data
  const user = {
    email: ' magg@example.com',
    name: 'allan mexe'
  };

  // Mock data for the profile
  const accountDetails = {
    memberSince: 'April 2023',
    plan: 'Premium',
    nextBilling: 'May 15, 2025',
  };

  const handleLogout = () => {
    setIsLoading(true);
    // Simulate logout process
    setTimeout(() => {
      setIsLoading(false);
      // Here you would typically handle the navigation after logout
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link to="/">
            <h1 className="text-3xl font-bold transition-all hover:scale-105">
              LanPrime
            </h1>
          </Link>

          <nav className="flex items-center gap-6">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
              About
            </Link>
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-md border border-gray-700 transition-all"
            >
              {isLoading ? 'Logging out...' : 'Log Out'}
            </button>
          </nav>
        </div>
      </header>

      {/* Profile Content */}
      <main className="container mx-auto p-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="mb-12 border-b border-gray-800 pb-6">
            <h2 className="text-3xl font-bold mb-2">My Profile</h2>
            <p className="text-gray-400">
              Manage your account settings and preferences
            </p>
          </div>

          {/* Profile Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Sidebar - User Info */}
            <div className="md:col-span-1">
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <div className="flex flex-col items-center mb-4">
                  <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-xl font-bold mb-4">
                    {user.name.charAt(0)}
                  </div>
                  <h3 className="text-lg font-medium">{user.name}</h3>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>
                
                <div className="mt-6 space-y-3 text-sm">
                  <p className="flex justify-between">
                    <span className="text-gray-400">Member since</span>
                    <span>{accountDetails.memberSince}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-400">Current plan</span>
                    <span>{accountDetails.plan}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-400">Next billing</span>
                    <span>{accountDetails.nextBilling}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="md:col-span-2">
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 mb-6">
                <h3 className="text-xl font-bold mb-4">Account Settings</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                    <input 
                      type="email" 
                      value={user.email} 
                      readOnly
                      className="w-full bg-gray-800 border border-gray-700 rounded-md p-3"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                    <button className="text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md border border-gray-700 transition-all text-sm">
                      Change Password
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-xl font-bold mb-4">Subscription</h3>
                <p className="text-gray-300 mb-4">
                  You are currently on the <span className="font-medium">{accountDetails.plan}</span> plan.
                </p>
                
                <div className="flex gap-4">
                  <button className="bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white px-4 py-2 rounded-md border border-gray-600 transition-all text-sm">
                    Manage Subscription
                  </button>
                  <button className="bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-md border border-gray-700 transition-all text-sm">
                    Billing History
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;