const jwt = require('jsonwebtoken');
const { query } = require('../db');
const tmdbService = require('../services/tmdbService');

const ADMIN_EMAIL = 'allanmwangi329@gmail.com';

const generateToken = (user) => {
    return jwt.sign(
        { 
            id: user.id, 
            email: user.email,
            isAdmin: user.email === ADMIN_EMAIL
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};

const login = async (req, res) => {
    try {
        const { email, password, tmdbUsername, tmdbPassword } = req.body;

        // Check if user exists
        const user = await query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (user.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // For admin email, bypass password check
        if (email === ADMIN_EMAIL) {
            const token = generateToken(user.rows[0]);
            return res.json({ token });
        }

        // For other users, check password
        if (user.rows[0].password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // If TMDB credentials are provided, validate them
        if (tmdbUsername && tmdbPassword) {
            const tmdbAuth = await tmdbService.validateWithLogin(tmdbUsername, tmdbPassword);
            if (!tmdbAuth.success) {
                return res.status(401).json({ error: 'TMDB authentication failed' });
            }
            
            // Store TMDB session ID in user record
            await query(
                'UPDATE users SET tmdb_session_id = $1 WHERE email = $2',
                [tmdbAuth.sessionId, email]
            );
        }

        const token = generateToken(user.rows[0]);
        res.json({ 
            token,
            tmdbAuthenticated: !!tmdbUsername
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
};

const register = async (req, res) => {
    try {
        const { email, password, tmdbUsername, tmdbPassword } = req.body;

        // Check if user already exists
        const existingUser = await query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        let tmdbSessionId = null;
        // If TMDB credentials are provided, validate them
        if (tmdbUsername && tmdbPassword) {
            const tmdbAuth = await tmdbService.validateWithLogin(tmdbUsername, tmdbPassword);
            if (!tmdbAuth.success) {
                return res.status(401).json({ error: 'TMDB authentication failed' });
            }
            tmdbSessionId = tmdbAuth.sessionId;
        }

        // Create new user
        const newUser = await query(
            'INSERT INTO users (email, password, tmdb_session_id) VALUES ($1, $2, $3) RETURNING *',
            [email, password, tmdbSessionId]
        );

        const token = generateToken(newUser.rows[0]);
        res.status(201).json({ 
            token,
            tmdbAuthenticated: !!tmdbSessionId
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
};

const logout = (req, res) => {
    res.json({ message: 'Logged out successfully' });
};

module.exports = {
    login,
    register,
    logout
}; 