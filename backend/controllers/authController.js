const jwt = require('jsonwebtoken');
const { query } = require('../db');

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
        const { email, password } = req.body;

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

        const token = generateToken(user.rows[0]);
        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
};

const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user already exists
        const existingUser = await query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create new user
        const newUser = await query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
            [email, password]
        );

        const token = generateToken(newUser.rows[0]);
        res.status(201).json({ token });
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