import { query, initDatabase } from '../db/index.js';
import dotenv from 'dotenv';

dotenv.config();

const testDatabaseConnection = async () => {
    try {
        // Test basic connection
        const result = await query('SELECT NOW()');
        console.log('✅ Database connection test:', result.rows[0]);

        // Test users table
        const users = await query('SELECT * FROM users LIMIT 1');
        console.log('✅ Users table test:', users.rows);

        // Test payments table
        const payments = await query('SELECT * FROM payments LIMIT 1');
        console.log('✅ Payments table test:', payments.rows);

        // Test subscriptions table
        const subscriptions = await query('SELECT * FROM subscriptions LIMIT 1');
        console.log('✅ Subscriptions table test:', subscriptions.rows);

        // Test user_sessions table
        const sessions = await query('SELECT * FROM user_sessions LIMIT 1');
        console.log('✅ User sessions table test:', sessions.rows);

    } catch (error) {
        console.error('❌ Database test failed:', error);
    }
};

// Run tests
console.log('🔍 Starting database tests...');
testDatabaseConnection(); 