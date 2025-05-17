import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { pool } from './index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const initDatabase = async () => {
    try {
        // Read the schema file
        const schemaPath = join(__dirname, 'schema.sql');
        const schema = await readFile(schemaPath, 'utf8');

        // Execute the schema
        await pool.query(schema);
        console.log('✅ Database schema initialized successfully');
    } catch (error) {
        console.error('❌ Database initialization error:', error);
        throw error;
    }
};

// Run the initialization
initDatabase()
    .then(() => {
        console.log('✅ Database initialization completed');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Database initialization failed:', error);
        process.exit(1);
    }); 