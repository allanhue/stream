const jwt = require('jsonwebtoken');
const { pool } = require('../db');
const bcrypt = require('bcrypt');
const tmdbService = require('../services/tmdbService');

const SUPERADMIN_EMAIL = 'allanmwangi329@gmail.com';

const generateToken = (user) => {
    return jwt.sign(
        { 
            id: user.id, 
            email: user.email,
            isAdmin: user.email === SUPERADMIN_EMAIL
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Special case for superadmin
        if (email === SUPERADMIN_EMAIL) {
            // Check if superadmin exists
            const superadminResult = await pool.query(
                'SELECT * FROM users WHERE email = $1 AND role = $2',
                [SUPERADMIN_EMAIL, 'superadmin']
            );

            if (superadminResult.rows.length === 0) {
                // Create superadmin if doesn't exist
                await pool.query(
                    'INSERT INTO users (email, role) VALUES ($1, $2)',
                    [SUPERADMIN_EMAIL, 'superadmin']
                );
            }

            // Generate token for superadmin
            const token = jwt.sign(
                { 
                    email: SUPERADMIN_EMAIL,
                    role: 'superadmin'
                },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            return res.json({
                success: true,
                data: {
                    token,
                    user: {
                        email: SUPERADMIN_EMAIL,
                        role: 'superadmin'
                    }
                }
            });
        }

        // Regular user login
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        const user = result.rows[0];

        // If user has no password (new user), create one
        if (!user.password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await pool.query(
                'UPDATE users SET password = $1 WHERE id = $2',
                [hashedPassword, user.id]
            );
        } else {
            // Verify password for existing users
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({
                    success: false,
                    error: 'Invalid credentials'
                });
            }
        }

        const token = jwt.sign(
            { 
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            data: {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role
                }
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            error: 'Login failed'
        });
    }
};

const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user already exists
        const existingUser = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({
                success: false,
                error: 'Email already registered'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const result = await pool.query(
            'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING id, email, role',
            [email, hashedPassword, 'user']
        );

        const user = result.rows[0];

        // Generate token
        const token = jwt.sign(
            { 
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            data: {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role
                }
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            error: 'Registration failed'
        });
    }
};

const logout = async (req, res) => {
    // Since we're using JWT, we don't need to do anything on the server
    // The client should remove the token
    res.json({ success: true });
};

module.exports = {
    login,
    register,
    logout
}; 