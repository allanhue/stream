import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Moon, 
  Sun, 
  Bell, 
  Shield, 
  Globe, 
  Download, 
  Eye, 
  Volume2,
  Smartphone,
  Lock,
  Save,
  AlertCircle,
  LogOut,
  CheckCircle,
  ChevronRight,
  Users,
  CreditCard,
  HelpCircle,
  Star,
  Crown,
  Zap
} from 'lucide-react';

// Setting Section Component
const SettingSection = ({ title, icon: Icon, children }) => {
  const [expanded, setExpanded] = useState(true);
  
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 transition-all duration-300 shadow-lg hover:shadow-blue-900/10">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Icon className="w-5 h-5 text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${expanded ? 'rotate-90' : ''}`} />
      </div>
      
      {expanded && (
        <div className="p-5 border-t border-gray-700/50 bg-gray-800/50">
          {children}
        </div>
      )}
    </div>
  );
};

// Toggle Switch Component
const ToggleSwitch = ({ checked, onChange, label }) => (
  <div className="flex items-center justify-between py-3">
    <span className="text-gray-300">{label}</span>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500 hover:bg-gray-600 peer-checked:hover:bg-blue-600"></div>
    </label>
  </div>
);

// Select Component
const Select = ({ value, onChange, options, label }) => (
  <div className="flex items-center justify-between py-3">
    <span className="text-gray-300">{label}</span>
    <select
      value={value}
      onChange={onChange}
      className="bg-gray-700 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 border border-gray-600 hover:border-gray-500 transition-colors"
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

// Volume Slider Component
const VolumeSlider = ({ value, onChange, label }) => (
  <div className="py-3">
    <div className="flex items-center justify-between mb-2">
      <span className="text-gray-300">{label}</span>
      <span className="text-blue-400 font-medium">{value}%</span>
    </div>
    <input
      type="range"
      min="0"
      max="100"
      value={value}
      onChange={onChange}
      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
    />
  </div>
);

// Main Settings Component
const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    // Appearance
    theme: 'dark',
    subtitleSize: 'medium',
    
    // Notifications
    notifications: true,
    newContentAlerts: true,
    marketingEmails: false,
    
    // Playback
    autoplay: true,
    quality: 'auto',
    volume: 80,
    
    // Privacy & Security
    privacyMode: false,
    twoFactorAuth: false,
    dataCollection: true,
    
    // Downloads
    downloadQuality: 'high',
    downloadWifiOnly: true,
    
    // Language & Accessibility
    language: 'en',
    subtitleLanguage: 'en',
    closedCaptions: false,
    
    // Device Management
    deviceSync: true,
    activeSessions: 2,
    
    // Subscription
    plan: 'premium',
    billingCycle: 'monthly',
    nextBillingDate: '2025-06-17',
    paymentMethod: 'credit_card',
    autoRenew: true
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: null });
  const [hasChanges, setHasChanges] = useState(false);
  const [subscriptionPlans, setSubscriptionPlans] = useState([
    {
      id: 'basic',
      name: 'Basic',
      price: 9.99,
      features: ['HD Available', 'Watch on 1 device', 'Unlimited movies and TV shows'],
      icon: Star
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 15.99,
      features: ['4K + HDR', 'Watch on 4 devices', 'Unlimited movies and TV shows', 'Ad-free experience'],
      icon: Crown,
      popular: true
    },
    {
      id: 'family',
      name: 'Family',
      price: 19.99,
      features: ['4K + HDR', 'Watch on 6 devices', 'Unlimited movies and TV shows', 'Ad-free experience', 'Family profiles'],
      icon: Users
    }
  ]);

  useEffect(() => {
    fetchUserSettings();
  }, []);

  const fetchUserSettings = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/settings`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSettings(response.data);
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to load settings. Please try again.'
      });
    }
  };

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/settings`,
        settings,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setStatus({ 
        type: 'success', 
        message: 'Settings saved successfully' 
      });
      setHasChanges(false);
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to save settings. Please try again.'
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => setStatus({ type: null, message: null }), 3000);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      }
    } catch (err) {
      console.error('Error during logout:', err);
    } finally {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  const handlePlanChange = async (planId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/subscription/change-plan`,
        { planId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setStatus({
        type: 'success',
        message: 'Subscription plan updated successfully'
      });
      
      // Refresh settings to get updated subscription info
      fetchUserSettings();
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to update subscription plan. Please try again.'
      });
    }
  };

  // Options for dropdowns
  const themeOptions = [
    { value: 'dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
    { value: 'system', label: 'System' }
  ];
  
  const qualityOptions = [
    { value: 'auto', label: 'Auto' },
    { value: 'high', label: 'High (1080p)' },
    { value: 'medium', label: 'Medium (720p)' },
    { value: 'low', label: 'Low (480p)' }
  ];
  
  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
    { value: 'ja', label: '日本語' }
  ];
  
  const downloadQualityOptions = [
    { value: 'high', label: 'High (1080p)' },
    { value: 'medium', label: 'Medium (720p)' },
    { value: 'low', label: 'Low (480p)' }
  ];
  
  const subtitleSizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Account Settings
          </h1>
          <p className="text-gray-400 mt-2">Customize your streaming experience</p>
        </div>

        {/* Status Messages */}
        {status.type && (
          <div className={`mb-6 p-4 ${
            status.type === 'error' 
              ? 'bg-red-500/10 border-red-500/30 text-red-400' 
              : 'bg-green-500/10 border-green-500/30 text-green-400'
          } border rounded-lg flex items-center gap-3 animate-fadeIn`}>
            {status.type === 'error' ? <AlertCircle className="w-5 h-5 flex-shrink-0" /> : <CheckCircle className="w-5 h-5 flex-shrink-0" />}
            <span>{status.message}</span>
          </div>
        )}

        {/* Settings Grid */}
        <div className="grid gap-6">
          {/* Subscription Plans */}
          <SettingSection title="Subscription Plans" icon={CreditCard}>
            <div className="grid md:grid-cols-3 gap-4">
              {subscriptionPlans.map((plan) => {
                const Icon = plan.icon;
                return (
                  <div
                    key={plan.id}
                    className={`relative p-6 rounded-xl border ${
                      plan.id === settings.plan
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-gray-700 bg-gray-800/50'
                    } hover:border-blue-500/50 transition-colors`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                        Most Popular
                      </div>
                    )}
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className="w-6 h-6 text-blue-400" />
                      <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                    </div>
                    <div className="text-2xl font-bold text-white mb-4">
                      ${plan.price}
                      <span className="text-sm text-gray-400 font-normal">/month</span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-300">
                          <Zap className="w-4 h-4 text-blue-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => handlePlanChange(plan.id)}
                      className={`w-full py-2 rounded-lg transition-colors ${
                        plan.id === settings.plan
                          ? 'bg-blue-500 text-white hover:bg-blue-600'
                          : 'bg-gray-700 text-white hover:bg-gray-600'
                      }`}
                    >
                      {plan.id === settings.plan ? 'Current Plan' : 'Switch Plan'}
                    </button>
                  </div>
                );
              })}
            </div>
          </SettingSection>

          {/* Appearance Section */}
          <SettingSection title="Appearance" icon={settings.theme === 'dark' ? Moon : Sun}>
            <Select 
              label="Theme" 
              value={settings.theme} 
              options={themeOptions}
              onChange={(e) => handleSettingChange('theme', e.target.value)}
            />
            <Select 
              label="Subtitle Size" 
              value={settings.subtitleSize} 
              options={subtitleSizeOptions}
              onChange={(e) => handleSettingChange('subtitleSize', e.target.value)}
            />
          </SettingSection>

          {/* Playback Section */}
          <SettingSection title="Playback & Performance" icon={Eye}>
            <ToggleSwitch 
              label="Autoplay Next Episode" 
              checked={settings.autoplay}
              onChange={(e) => handleSettingChange('autoplay', e.target.checked)}
            />
            <Select 
              label="Streaming Quality" 
              value={settings.quality} 
              options={qualityOptions}
              onChange={(e) => handleSettingChange('quality', e.target.value)}
            />
            <VolumeSlider 
              label="Default Volume" 
              value={settings.volume}
              onChange={(e) => handleSettingChange('volume', parseInt(e.target.value))}
            />
          </SettingSection>

          {/* Notifications Section */}
          <SettingSection title="Notifications" icon={Bell}>
            <ToggleSwitch 
              label="Push Notifications" 
              checked={settings.notifications}
              onChange={(e) => handleSettingChange('notifications', e.target.checked)}
            />
            <ToggleSwitch 
              label="New Content Alerts" 
              checked={settings.newContentAlerts}
              onChange={(e) => handleSettingChange('newContentAlerts', e.target.checked)}
            />
            <ToggleSwitch 
              label="Marketing Emails" 
              checked={settings.marketingEmails}
              onChange={(e) => handleSettingChange('marketingEmails', e.target.checked)}
            />
          </SettingSection>

          {/* Privacy & Security */}
          <SettingSection title="Privacy & Security" icon={Shield}>
            <ToggleSwitch 
              label="Privacy Mode" 
              checked={settings.privacyMode}
              onChange={(e) => handleSettingChange('privacyMode', e.target.checked)}
            />
            <ToggleSwitch 
              label="Two-Factor Authentication" 
              checked={settings.twoFactorAuth}
              onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
            />
            <ToggleSwitch 
              label="Allow Data Collection" 
              checked={settings.dataCollection}
              onChange={(e) => handleSettingChange('dataCollection', e.target.checked)}
            />
          </SettingSection>

          {/* Downloads */}
          <SettingSection title="Downloads" icon={Download}>
            <Select 
              label="Download Quality" 
              value={settings.downloadQuality} 
              options={downloadQualityOptions}
              onChange={(e) => handleSettingChange('downloadQuality', e.target.value)}
            />
            <ToggleSwitch 
              label="Download on Wi-Fi Only" 
              checked={settings.downloadWifiOnly}
              onChange={(e) => handleSettingChange('downloadWifiOnly', e.target.checked)}
            />
          </SettingSection>

          {/* Language & Accessibility */}
          <SettingSection title="Language & Accessibility" icon={Globe}>
            <Select 
              label="Interface Language" 
              value={settings.language} 
              options={languageOptions}
              onChange={(e) => handleSettingChange('language', e.target.value)}
            />
            <Select 
              label="Subtitle Language" 
              value={settings.subtitleLanguage} 
              options={languageOptions}
              onChange={(e) => handleSettingChange('subtitleLanguage', e.target.value)}
            />
            <ToggleSwitch 
              label="Closed Captions" 
              checked={settings.closedCaptions}
              onChange={(e) => handleSettingChange('closedCaptions', e.target.checked)}
            />
          </SettingSection>
          
          {/* Device Management */}
          <SettingSection title="Device Management" icon={Smartphone}>
            <div className="bg-gray-700/50 p-4 rounded-lg mb-3">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-white">Active Sessions</h4>
                  <p className="text-sm text-gray-400">2 devices connected</p>
                </div>
                <button className="text-blue-400 hover:text-blue-300 text-sm">Manage</button>
              </div>
            </div>
            <ToggleSwitch 
              label="Sync Across Devices" 
              checked={settings.deviceSync}
              onChange={(e) => handleSettingChange('deviceSync', e.target.checked)}
            />
          </SettingSection>
          
          {/* Account & Subscription */}
          <SettingSection title="Account & Subscription" icon={CreditCard}>
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-4 rounded-lg mb-4 border border-blue-700/30">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-white">Current Plan</span>
                <span className="bg-blue-500 text-xs text-white px-2 py-1 rounded-full">
                  {settings.plan.charAt(0).toUpperCase() + settings.plan.slice(1)}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Billed {settings.billingCycle} • Next billing date: {new Date(settings.nextBillingDate).toLocaleDateString()}
              </p>
              <div className="space-y-3">
                <button className="text-sm text-blue-400 hover:text-blue-300">
                  Update Payment Method
                </button>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="autoRenew"
                    checked={settings.autoRenew}
                    onChange={(e) => handleSettingChange('autoRenew', e.target.checked)}
                    className="rounded border-gray-600 text-blue-500 focus:ring-blue-500"
                  />
                  <label htmlFor="autoRenew" className="text-sm text-gray-300">
                    Auto-renew subscription
                  </label>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700/50 pt-3 mt-3">
              <button 
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 text-sm flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out From All Devices
              </button>
            </div>
          </SettingSection>
          
          {/* Help & Support */}
          <SettingSection title="Help & Support" icon={HelpCircle}>
            <div className="space-y-3">
              <button className="w-full text-left py-3 px-4 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors flex justify-between items-center">
                <span>Contact Support</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button className="w-full text-left py-3 px-4 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors flex justify-between items-center">
                <span>FAQ & Troubleshooting</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button className="w-full text-left py-3 px-4 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors flex justify-between items-center">
                <span>Privacy Policy</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </SettingSection>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end items-center gap-4">
          <button 
            onClick={() => fetchUserSettings()}
            className="px-5 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleSaveSettings}
            disabled={isLoading || !hasChanges}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            Save Changes
          </button>
        </div>
        
        {/* Styled keyframes for animations */}
        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease forwards;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Settings;