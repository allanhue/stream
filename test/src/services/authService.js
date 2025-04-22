const TMDB_AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODgxY2RmMWY2YzExMjhiNWMyNWE4MjFiMTEwMjBmNyIsIm5iZiI6MTc0NDg5NTA3Mi44MzIsInN1YiI6IjY4MDBmYzYwNjFiMWM0YmIzMjk5ZjNlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eoWQ090wBdP37Eq7pwobfGHxWXfslhix2JtSLDHB8Bc';

export const authService = {
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