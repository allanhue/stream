//set up express server
const express = require("express");
const cors = require("cors");
const pool = require("./db");
const axios = require('axios');
const path = require('path');

const {
    authenticateToken,
    limiter,
    errorHandler,
    cors: customCors,
    requestLogger,
    validateContentType
} = require('./middlewares');

const app = express();

// Middleware
app.use(cors());
app.use(customCors);
app.use(limiter);
app.use(requestLogger);
app.use(validateContentType);
app.use(express.json());

// TMDB API Configuration
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Test database connection immediately
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Database connection failed');
        console.error(err.message);
    } else {
        console.log('✅ Database connected successfully');
    }
});

// TMDB API Routes
app.get("/api/movies/popular", async (req, res) => {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`);
        res.json(response.data.results);
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        res.status(500).json({ error: 'Failed to fetch popular movies' });
    }
});

app.get("/api/movies/search", async (req, res) => {
    try {
        const { query } = req.query;
        const response = await axios.get(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}`);
        res.json(response.data.results);
    } catch (error) {
        console.error('Error searching movies:', error);
        res.status(500).json({ error: 'Failed to search movies' });
    }
});

app.get("/api/movies/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching movie details:', error);
        res.status(500).json({ error: 'Failed to fetch movie details' });
    }
});

// Streaming routes
app.get("/api/stream/:videoId", authenticateToken, async (req, res) => {
    try {
        const { videoId } = req.params;
        // Here you would implement your streaming logic
        // This could involve Mux, AWS S3, or other streaming services
        res.json({ message: "Streaming endpoint", videoId });
    } catch (error) {
        console.error('Error handling stream:', error);
        res.status(500).json({ error: 'Failed to handle stream' });
    }
});

// Test route
app.get("/streamapp/test", async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ 
            message: "Backend is connected!",
            timestamp: result.rows[0].now
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

// Protected routes
app.use('/api/protected', authenticateToken);

//define the routes
app.get("/streamapp/",(req,res)=>{
    res.send("Hello World");
})

// Error handler should be last
app.use(errorHandler);

//set up express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

