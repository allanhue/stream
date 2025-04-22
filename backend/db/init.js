const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function initDatabase() {
    try {
        // Read the schema file
        const schemaSQL = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
        
        // Create the database if it doesn't exist
        await pool.query(`
            DO $$ 
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'lan_prime') THEN
                    CREATE DATABASE lan_prime;
                END IF;
            END $$;
        `);

        // Execute the schema
        await pool.query(schemaSQL);
        
        console.log('✅ Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
}

// Run the initialization
initDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error('❌ Database initialization failed:', error);
        process.exit(1);
    }); 