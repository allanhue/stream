const axios = require('axios');

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODgxY2RmMWY2YzExMjhiNWMyNWE4MjFiMTEwMjBmNyIsIm5iZiI6MTc0NDg5NTA3Mi44MzIsInN1YiI6IjY4MDBmYzYwNjFiMWM0YmIzMjk5ZjNlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eoWQ090wBdP37Eq7pwobfGHxWXfslhix2JtSLDHB8Bc';

const tmdbService = {
    getDiscoverMovies: async () => {
        try {
            const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
                params: {
                    include_adult: false,
                    include_video: false,
                    language: 'en-US',
                    page: 1,
                    sort_by: 'popularity.desc'
                },
                headers: {
                    'Authorization': `Bearer ${TMDB_AUTH_TOKEN}`,
                    'accept': 'application/json'
                }
            });
            
            return response.data;
        } catch (error) {
            console.error('Error fetching movies:', error);
            throw error;
        }
    },

    getMovieDetails: async (movieId) => {
        try {
            const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}`, {
                headers: {
                    'Authorization': `Bearer ${TMDB_AUTH_TOKEN}`,
                    'accept': 'application/json'
                }
            });
            
            return response.data;
        } catch (error) {
            console.error('Error fetching movie details:', error);
            throw error;
        }
    }
};

module.exports = tmdbService;