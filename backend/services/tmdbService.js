const axios = require('axios');
require('dotenv').config();

class TMDBService {
    constructor() {
        this.apiKey = process.env.TMDB_API_KEY;
        this.baseUrl = 'https://api.themoviedb.org/3';
    }

    async validateWithLogin(username, password) {
        try {
            // First, get the request token
            const tokenResponse = await axios.get(
                `${this.baseUrl}/authentication/token/new?api_key=${this.apiKey}`
            );
            
            const requestToken = tokenResponse.data.request_token;

            // Validate the token with login
            const validateResponse = await axios.post(
                `${this.baseUrl}/authentication/token/validate_with_login`,
                {
                    username,
                    password,
                    request_token: requestToken
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.apiKey}`
                    }
                }
            );

            // Create a session
            const sessionResponse = await axios.post(
                `${this.baseUrl}/authentication/session/new?api_key=${this.apiKey}`,
                {
                    request_token: requestToken
                }
            );

            return {
                success: true,
                sessionId: sessionResponse.data.session_id
            };
        } catch (error) {
            console.error('TMDB Authentication error:', error.response?.data || error.message);
            return {
                success: false,
                error: error.response?.data?.status_message || 'Authentication failed'
            };
        }
    }

    async getPopularMovies() {
        try {
            const response = await axios.get(
                `${this.baseUrl}/movie/popular?api_key=${this.apiKey}`
            );
            return response.data.results;
        } catch (error) {
            console.error('Error fetching popular movies:', error);
            throw error;
        }
    }

    async getMovieDetails(movieId) {
        try {
            const response = await axios.get(
                `${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}`
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching movie details:', error);
            throw error;
        }
    }
}

module.exports = new TMDBService();