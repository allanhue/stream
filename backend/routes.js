const express = require('express');
const router = express.Router();
const { authenticateToken } = require('./middlewares');
const axios = require('axios');
const authController = require('./controllers/authController');
const videoController = require('./controllers/videoController');
const categoryController = require('./controllers/categoryController');
const { storeMovie, query } = require('./db');
const tmdbService = require('./services/tmdbService');

// Auth routes
router.post('/auth/login', authController.login);
router.post('/auth/logout', authenticateToken, authController.logout);
router.post('/auth/register', authController.register);

// Movie routes
router.get('/movies', async (req, res) => {
    try {
        const movies = await tmdbService.getPopularMovies();
        res.json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Error fetching movies' });
    }
});

// Get movie details
router.get('/movies/:id', async (req, res) => {
    try {
        const movie = await tmdbService.getMovie(req.params.id);
        const credits = await tmdbService.getMovieCredits(req.params.id);
        res.json({ ...movie, credits });
    } catch (error) {
        console.error('Error fetching movie:', error);
        res.status(500).json({ error: 'Error fetching movie' });
    }
});

// Get genres
router.get('/genres', async (req, res) => {
    try {
        const genres = await tmdbService.getGenres();
        res.json(genres);
    } catch (error) {
        console.error('Error fetching genres:', error);
        res.status(500).json({ error: 'Error fetching genres' });
    }
});

// Search movies
router.get('/search', async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ error: 'Search query is required' });
        }
        const movies = await tmdbService.searchMovies(query);
        res.json(movies);
    } catch (error) {
        console.error('Error searching movies:', error);
        res.status(500).json({ error: 'Error searching movies' });
    }
});

// Video routes
router.get('/videos', authenticateToken, videoController.getVideos);
router.get('/videos/:id', authenticateToken, videoController.getVideoById);
router.post('/videos', authenticateToken, videoController.createVideo);
router.put('/videos/:id', authenticateToken, videoController.updateVideo);
router.delete('/videos/:id', authenticateToken, videoController.deleteVideo);
router.get('/videos/:id/stream', authenticateToken, videoController.streamVideo);
router.get('/videos/category/:categoryId', authenticateToken, videoController.getVideosByCategory);

// Category routes
router.get('/categories', authenticateToken, categoryController.getCategories);
router.get('/categories/:id', authenticateToken, categoryController.getCategoryById);
router.post('/categories', authenticateToken, categoryController.createCategory);
router.put('/categories/:id', authenticateToken, categoryController.updateCategory);
router.delete('/categories/:id', authenticateToken, categoryController.deleteCategory);

module.exports = router;