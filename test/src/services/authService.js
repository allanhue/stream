import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const SUPERADMIN_EMAIL = 'allanmwangi329@gmail.com';

export const authService = {
    login: async (email, password) => {
        try {
            // For superadmin, don't send password
            const payload = email === SUPERADMIN_EMAIL 
                ? { email } 
                : { email, password };

            const response = await axios.post(`${API_URL}/auth/login`, payload);
            
            if (response.data.success) {
                localStorage.setItem('token', response.data.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.data.user));
                return response.data.data;
            }
            throw new Error(response.data.error || 'Login failed');
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Login failed');
        }
    },

    register: async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/auth/register`, {
                email,
                password
            });
            
            if (response.data.success) {
                localStorage.setItem('token', response.data.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.data.user));
                return response.data.data;
            }
            throw new Error(response.data.error || 'Registration failed');
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Registration failed');
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },

    isSuperadmin: () => {
        const user = authService.getCurrentUser();
        return user?.email === SUPERADMIN_EMAIL;
    },

    createGuestSession: async () => {
        try {
            const response = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new', {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${TMDB_AUTH_TOKEN}`
                }
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating guest session:', error);
            throw error;
        }
    },

    createAuthToken: async () => {
        try {
            const response = await fetch('https://api.themoviedb.org/3/authentication/token/new', {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${TMDB_AUTH_TOKEN}`
                }
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating auth token:', error);
            throw error;
        }
    },

    validateSubscription: (user) => {
        // Check if user has an active subscription
        if (!user) return 'free';
        
        const subscription = localStorage.getItem('subscription_status');
        if (!subscription) return 'free';

        return subscription; // 'free', 'trial', 'basic', 'premium'
    }
};