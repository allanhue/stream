const axios = require('axios');
require('dotenv').config();

const tmdbApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: process.env.TMDB_API_KEY
    }
});

const tmdbService = {
    // Get movie details
    getMovie: async (movieId) => {
        try {
            const response = await tmdbApi.get(`/movie/${movieId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching movie:', error);
            throw error;
        }
    },

    // Get popular movies
    getPopularMovies: async () => {
        try {
            const response = await tmdbApi.get('/movie/popular');
            return response.data.results;
        } catch (error) {
            console.error('Error fetching popular movies:', error);
            throw error;
        }
    },

    // Get movie genres
    getGenres: async () => {
        try {
            const response = await tmdbApi.get('/genre/movie/list');
            return response.data.genres;
        } catch (error) {
            console.error('Error fetching genres:', error);
            throw error;
        }
    },

    // Search movies
    searchMovies: async (query) => {
        try {
            const response = await tmdbApi.get('/search/movie', {
                params: { query }
            });
            return response.data.results;
        } catch (error) {
            console.error('Error searching movies:', error);
            throw error;
        }
    },

    // Get movie credits
    getMovieCredits: async (movieId) => {
        try {
            const response = await tmdbApi.get(`/movie/${movieId}/credits`);
            return response.data;
        } catch (error) {
            console.error('Error fetching movie credits:', error);
            throw error;
        }
    }
};

module.exports = tmdbService; 