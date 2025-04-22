const API_BASE_URL = 'http://localhost:3000/api';

export const api = {
    // Auth endpoints
    login: async (credentials) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        return response.json();
    },

    register: async (userData) => {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        return response.json();
    },

    // Movie endpoints
    getMovies: async (token) => {
        const response = await fetch(`${API_BASE_URL}/movies`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.json();
    },

    getMovieDetails: async (movieId, token) => {
        const response = await fetch(`${API_BASE_URL}/movies/${movieId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.json();
    },

    // Video endpoints
    getVideos: async (token) => {
        const response = await fetch(`${API_BASE_URL}/videos`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.json();
    },

    // Category endpoints
    getCategories: async (token) => {
        const response = await fetch(`${API_BASE_URL}/categories`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.json();
    },
}; 