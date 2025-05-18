import fs from 'fs';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Database configuration
const getDbConfig = () => {
    try {
        const ca = fs.readFileSync(process.env.PG_CA_CERT).toString();
        return {
            connectionString: process.env.DATABASE_URL,
            ssl: {
                ca,
                rejectUnauthorized: true
            }
        };
    } catch (error) {
        console.error('Error reading CA certificate:', error);
        throw new Error('Failed to read CA certificate. Please ensure the file exists and is accessible.');
    }
};

// Initialize connection pool
const pool = new Pool(getDbConfig());

// Test database connection
pool.on('connect', () => {
    console.log('✅ Connected to Aiven PostgreSQL database securely');
});

pool.on('error', (err) => {
    console.error('❌ Database connection error:', err);
    // Don't exit process on error, let the retry mechanism handle it
});

// Query function with error handling and retries
export const query = async (text, params, retries = 3) => {
    let lastError;
    
    for (let i = 0; i < retries; i++) {
        const client = await pool.connect();
        try {
            const result = await client.query(text, params);
            return result;
        } catch (error) {
            console.error(`Query attempt ${i + 1} failed:`, error);
            lastError = error;
            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        } finally {
            client.release();
        }
    }
    
    throw lastError;
};

// Initialize database tables with retry mechanism
export const initDatabase = async () => {
    const maxRetries = 5;
    const retryDelay = 5000; // 5 seconds

    for (let i = 0; i < maxRetries; i++) {
        try {
            // Create users table
            await query(`
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    name VARCHAR(255),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    last_login TIMESTAMP,
                    is_active BOOLEAN DEFAULT true,
                    role VARCHAR(50) DEFAULT 'user'
                );
            `);

            // Create payments table
            await query(`
                CREATE TABLE IF NOT EXISTS payments (
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER REFERENCES users(id),
                    amount DECIMAL(10,2) NOT NULL,
                    currency VARCHAR(3) DEFAULT 'USD',
                    status VARCHAR(50) NOT NULL,
                    payment_method VARCHAR(50),
                    transaction_id VARCHAR(255),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            `);

            // Create subscriptions table
            await query(`
                CREATE TABLE IF NOT EXISTS subscriptions (
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER REFERENCES users(id),
                    plan_type VARCHAR(50) NOT NULL,
                    start_date TIMESTAMP NOT NULL,
                    end_date TIMESTAMP NOT NULL,
                    status VARCHAR(50) NOT NULL,
                    auto_renew BOOLEAN DEFAULT false,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            `);

            // Create user_sessions table
            await query(`
                CREATE TABLE IF NOT EXISTS user_sessions (
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER REFERENCES users(id),
                    token VARCHAR(255) NOT NULL,
                    expires_at TIMESTAMP NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            `);

            console.log('✅ Database tables initialized successfully');
            return; // Success, exit the function
        } catch (error) {
            console.error(`❌ Database initialization attempt ${i + 1} failed:`, error);
            if (i < maxRetries - 1) {
                console.log(`⏳ Retrying in ${retryDelay/1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, retryDelay));
            } else {
                throw error; // Throw error after all retries are exhausted
            }
        }
    }
}; 