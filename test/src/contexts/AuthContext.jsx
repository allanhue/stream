import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendEmailVerification,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { auth } from '../firebase';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signup = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(userCredential.user);
            return userCredential.user;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);
            return userCredential.user;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const value = {
        user,
        loading,
        error,
        signup,
        login,
        loginWithGoogle,
        logout,
        isAuthenticated: !!user,
        isEmailVerified: user?.emailVerified ?? false
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};