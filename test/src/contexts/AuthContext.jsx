import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tmdbSession, setTmdbSession] = useState(null);
    const [subscriptionStatus, setSubscriptionStatus] = useState('free');

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                // Create TMDB guest session
                const session = await authService.createGuestSession();
                setTmdbSession(session);

                // Get auth token
                const token = await authService.createAuthToken();
                localStorage.setItem('tmdb_token', token.request_token);
            } catch (error) {
                console.error('Error initializing auth:', error);
            }
        };
        initializeAuth();
    }, []);

    useEffect(() => {
        // Check for token in localStorage and set user
        const token = localStorage.getItem('token');
        if (token) {
            // Optionally decode token for user info, or fetch user profile from backend
            setUser({ token });
        }
        setLoading(false);
    }, []);

    // Handle subscription changes
    const updateSubscription = async (plan) => {
        try {
            localStorage.setItem('subscription_status', plan);
            setSubscriptionStatus(plan);
        } catch (error) {
            console.error('Error updating subscription:', error);
            throw error;
        }
    };

    // Start free trial
    const startFreeTrial = async () => {
        try {
            await updateSubscription('trial');
            return true;
        } catch (error) {
            console.error('Error starting free trial:', error);
            return false;
        }
    };

    // Signup using backend
    const signup = async (email, password) => {
        try {
            const res = await axios.post('/api/auth/register', { email, password });
            localStorage.setItem('token', res.data.token);
            setUser({ email });
            return res.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || error.message);
        }
    };

    // Login using backend
    const login = async (email, password) => {
        try {
            const res = await axios.post('/api/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            setUser({ email });
            return res.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || error.message);
        }
    };

    // Logout
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    // Placeholder for Google sign-in (not implemented)
    const signInWithGoogle = async () => {
        throw new Error('Google sign-in not implemented');
    };

    const value = {
        user,
        loading,
        tmdbSession,
        subscriptionStatus,
        updateSubscription,
        startFreeTrial,
        signup,
        login,
        logout,
        signInWithGoogle
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};