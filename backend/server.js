import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import routes from './src/routes/index.js';
import { initDatabase } from './db/index.js';
import {
    authenticateToken,
    limiter,
    errorHandler,
    cors: customCors,
    requestLogger,
    validateContentType,
} from './middlewares.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://lanprimee.netlify.app'] 
        : ['http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(customCors);
app.use(limiter);
app.use(requestLogger);
app.use(validateContentType);
app.use(express.json());

// Initialize database and start server
const startServer = async () => {
    try {
        await initDatabase();
        console.log('✅ Database connected successfully');
        
        // Mount routes
        app.use('/api', routes);
        
        // Error handler should be last
        app.use(errorHandler);
        
        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

