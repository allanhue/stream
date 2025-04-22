const express = require('express');
const router = express.Router();
const { authenticateToken } = require('./middlewares');
const axios = require('axios');
const authController = require('./controllers/authController');
const videoController = require('./controllers/videoController');
const categoryController = require('./controllers/categoryController');
const { storeMovie, query } = require('./db');

// Auth routes
router.post('/auth/login', authController.login);
router.post('/auth/logout', authenticateToken, authController.logout);
router.post('/auth/register', authController.register);

// Movie routes
router.get('/movies', authenticateToken, async (req, res) => {
    try {
        // First, fetch from TMDB
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
            params: {
                api_key: process.env.TMDB_API_KEY
            }
        });

        // Store movies in local database
        for (const movie of response.data.results) {
            await storeMovie(movie);
        }

        // Get movies from local database with genres
        const movies = await query(`
            SELECT 
                m.*,
                array_agg(g.name) as genres
            FROM movies m
            LEFT JOIN movie_genres mg ON m.id = mg.movie_id
            LEFT JOIN genres g ON mg.genre_id = g.id
            GROUP BY m.id
            ORDER BY m.created_at DESC
            LIMIT 20
        `);

        res.json(movies.rows);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Error fetching movies' });
    }
});

// Get movie by ID
router.get('/movies/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        
        // First try to get from TMDB
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
            params: {
                api_key: process.env.TMDB_API_KEY
            }
        });

        // Store in local database
        await storeMovie(response.data);

        // Get from local database with genres
        const movie = await query(`
            SELECT 
                m.*,
                array_agg(g.name) as genres
            FROM movies m
            LEFT JOIN movie_genres mg ON m.id = mg.movie_id
            LEFT JOIN genres g ON mg.genre_id = g.id
            WHERE m.tmdb_id = $1
            GROUP BY m.id
        `, [id]);

        if (movie.rows.length === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.json(movie.rows[0]);
    } catch (error) {
        console.error('Error fetching movie:', error);
        res.status(500).json({ error: 'Error fetching movie' });
    }
});

// Get genres
router.get('/genres', authenticateToken, async (req, res) => {
    try {
        const genres = await query(`
            SELECT * FROM genres
            ORDER BY name ASC
        `);
        res.json(genres.rows);
    } catch (error) {
        console.error('Error fetching genres:', error);
        res.status(500).json({ error: 'Error fetching genres' });
    }
});

// Protected routes
router.get('/videos', authenticateToken, videoController.getVideos);
router.get('/categories', authenticateToken, categoryController.getCategories);

module.exports = router;