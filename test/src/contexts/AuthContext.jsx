import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { auth } from '../firebase';
import { authService } from '../services/authService';

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
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    // Handle subscription changes
    const updateSubscription = async (plan) => {
        try {
            // In a real app, you'd verify the purchase with your backend
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

    const signup = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(userCredential.user);
            return userCredential.user;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const logout = () => {
        return signOut(auth);
    };

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            return result.user;
        } catch (error) {
            throw new Error(error.message);
        }
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