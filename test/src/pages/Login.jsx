import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Google } from 'lucide-react';

const Login = () => {
  const { signInWithGoogle } = useAuth();
  const [currentForm, setCurrentForm] = useState('login'); // 'login', 'signup', or 'confirmation'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  // Password strength calculator
  useEffect(() => {
    if (password.length === 0) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    setPasswordStrength(Math.min(strength, 5));
  }, [password]);

  // Countdown timer for resend code
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateLoginForm = () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const validateSignupForm = () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    if (passwordStrength < 3) {
      setError('Password is too weak. Include uppercase, numbers, and symbols');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const validateConfirmationForm = () => {
    if (!/^\d{6}$/.test(confirmationCode)) {
      setError('Confirmation code must be 6 digits');
      return false;
    }
    return true;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateLoginForm()) return;
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Login attempt with:', { email, password });
      navigate('/dashboard'); // Redirect on success
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateSignupForm()) return;
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Signup attempt with:', { email, password });
      setCountdown(30); // Start countdown for resend
      setCurrentForm('confirmation');
    } catch (err) {
      setError('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmationSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateConfirmationForm()) return;
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Verification attempt with:', { email, confirmationCode });
      setCurrentForm('login');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setConfirmationCode('');
      alert('Account verified successfully! Please login.');
    } catch (err) {
      setError('Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;
    
    setError('');
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Resending code to:', email);
      setCountdown(30);
      alert('Verification code resent!');
    } catch (err) {
      setError('Failed to resend code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const renderPasswordStrength = () => {
    if (password.length === 0) return null;
    
    const strengthText = [
      'Very Weak',
      'Weak',
      'Moderate',
      'Strong',
      'Very Strong',
      'Excellent'
    ][passwordStrength];
    
    const strengthColors = [
      'bg-red-500',
      'bg-orange-500',
      'bg-yellow-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-emerald-500'
    ];
    
    return (
      <div className="mt-2">
        <div className="flex gap-1 mb-1">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className={`h-1 flex-1 rounded-full ${i < passwordStrength ? strengthColors[passwordStrength] : 'bg-gray-700'}`}
            />
          ))}
        </div>
        <p className={`text-xs ${passwordStrength < 2 ? 'text-red-400' : passwordStrength < 4 ? 'text-yellow-400' : 'text-green-400'}`}>
          Password strength: {strengthText}
        </p>
      </div>
    );
  };

  const renderLoginForm = () => (
    <>
      
      {error && (
        <div className="bg-red-900/30 border border-red-500 rounded-md p-3 mb-6 animate-fade-in">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleLoginSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <button 
                type="button"
                onClick={() => alert('Password reset functionality')} 
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition pr-10"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 
              text-white font-medium py-3 px-4 rounded-md shadow-lg 
              border border-blue-500 transition-all duration-200 flex items-center justify-center
              ${isLoading ? 'opacity-80 cursor-not-allowed' : 'hover:shadow-blue-500/20'}`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : 'Sign in'}
          </button>
        </div>
      </form>

      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-black text-gray-400">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-gray-900 text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors"
          >
            <Google size={20} />
          </button>
          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-gray-900 text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </button>
        </div>
      </div>

      <p className="mt-8 text-center text-gray-400">
        Don't have an account?{' '}
        <button 
          onClick={() => {
            setCurrentForm('signup');
            setError('');
          }} 
          className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
        >
          Sign up
        </button>
      </p>
    </>
  );

  const renderSignupForm = () => (
    <>
      
      {error && (
        <div className="bg-red-900/30 border border-red-500 rounded-md p-3 mb-6 animate-fade-in">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSignupSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-300">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition pr-10"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {renderPasswordStrength()}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2 text-gray-300">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              placeholder="Confirm your password"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 
              text-white font-medium py-3 px-4 rounded-md shadow-lg 
              border border-green-500 transition-all duration-200 flex items-center justify-center
              ${isLoading ? 'opacity-80 cursor-not-allowed' : 'hover:shadow-green-500/20'}`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </>
            ) : 'Create Account'}
          </button>
        </div>
      </form>

      <div className="mt-8 text-center text-gray-400">
        Already have an account?{' '}
        <button 
          onClick={() => {
            setCurrentForm('login');
            setError('');
          }} 
          className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
        >
          Sign in
        </button>
      </div>
    </>
  );

  const renderConfirmationForm = () => (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">Verify Email</h2>
      
      {error && (
        <div className="bg-red-900/30 border border-red-500 rounded-md p-3 mb-6 animate-fade-in">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <p className="text-gray-400 mb-6 text-center">
        We've sent a verification code to <span className="text-white font-medium">{email}</span>
      </p>

      <form onSubmit={handleConfirmationSubmit} className="space-y-6">
        <div>
          <label htmlFor="confirmationCode" className="block text-sm font-medium mb-2 text-gray-300">
            Verification Code
          </label>
          <div className="flex">
            <input
              id="confirmationCode"
              name="confirmationCode"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              required
              value={confirmationCode}
              onChange={(e) => {
                if (/^\d*$/.test(e.target.value)) {
                  setConfirmationCode(e.target.value);
                }
              }}
              className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition text-center tracking-widest font-mono text-lg"
              placeholder="------"
              maxLength={6}
              autoFocus
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Check your email for the 6-digit verification code</p>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 
              text-white font-medium py-3 px-4 rounded-md shadow-lg 
              border border-green-500 transition-all duration-200 flex items-center justify-center
              ${isLoading ? 'opacity-80 cursor-not-allowed' : 'hover:shadow-green-500/20'}`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </>
            ) : 'Verify Email'}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={handleResendCode}
          disabled={countdown > 0 || isLoading}
          className={`text-sm ${countdown > 0 || isLoading ? 'text-gray-500' : 'text-blue-400 hover:text-blue-300'} transition-colors`}
        >
          {countdown > 0 ? `Resend code in ${countdown}s` : "Didn't receive a code? Resend"}
        </button>
      </div>

      <div className="mt-8 text-center text-gray-400">
        <button 
          onClick={() => {
            setCurrentForm('signup');
            setError('');
          }} 
          className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
        >
          Back to sign up
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-gray-800 bg-opacity-50 backdrop-blur-sm p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome to StreamVibe</h2>
          <p className="text-gray-300">Sign in to continue watching</p>
        </div>
        
        {currentForm === 'login' && renderLoginForm()}
        {currentForm === 'signup' && renderSignupForm()}
        {currentForm === 'confirmation' && renderConfirmationForm()}
      </div>
    </div>
  );
};

export default Login;
