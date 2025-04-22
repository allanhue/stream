const express = require('express');
const router = express.Router();
const { authenticateToken } = require('./middlewares');
const axios = require('axios');
const authController = require('./controllers/authController');
const videoController = require('./controllers/videoController');
const categoryController = require('./controllers/categoryController');

// Auth routes
router.post('/auth/login', authController.login);
router.post('/auth/logout', authenticateToken, authController.logout);
router.post('/auth/register', authController.register);

// Movie routes
router.get('/movies', authenticateToken, async (req, res) => {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
            params: {
                api_key: process.env.TMDB_API_KEY
            }
        });

        const movies = response.data.results.map(movie => ({
            id: movie.id,
            title: movie.title,
            year: new Date(movie.release_date).getFullYear(),
            rating: movie.vote_average / 2, // Convert 10-point scale to 5-point
            thumbnail: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
            backdrop: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
            description: movie.overview,
            genre: movie.genre_ids.map(id => {
                const genres = {
                    28: 'Action',
                    12: 'Adventure',
                    16: 'Animation',
                    35: 'Comedy',
                    80: 'Crime',
                    99: 'Documentary',
                    18: 'Drama',
                    10751: 'Family',
                    14: 'Fantasy',
                    36: 'History',
                    27: 'Horror',
                    10402: 'Music',
                    9648: 'Mystery',
                    10749: 'Romance',
                    878: 'Science Fiction',
                    10770: 'TV Movie',
                    53: 'Thriller',
                    10752: 'War',
                    37: 'Western'
                };
                return genres[id] || 'Unknown';
            })
        }));

        res.json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Error fetching movies' });
    }
});

// Protected routes
router.get('/videos', authenticateToken, videoController.getVideos);
router.get('/categories', authenticateToken, categoryController.getCategories);

module.exports = router;