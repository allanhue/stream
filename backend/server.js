import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDatabase } from './db/index.js';
import authRoutes from './routes/auth.js';
import paymentRoutes from './routes/payment.js';
import subscriptionRoutes from './routes/subscription.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',')
    : [
        'https://lanprime.netlify.app',
        'https://lanprimee.netlify.app',
        'https://stream-back-7dx8.onrender.com',
        'http://localhost:5173'
    ];

app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());

// Initialize database with retry logic
const initializeApp = async (retries = 5, delay = 5000) => {
    for (let i = 0; i < retries; i++) {
        try {
            await initDatabase();
            console.log('✅ Database wahala just allan');
            break;
        } catch (error) {
            console.error(`❌ Database initialization attempt ${i + 1} failed:`, error);
            if (i === retries - 1) {
                console.error('❌ Max retries reached. Exiting...');
                process.exit(1);
            }
            console.log(`⏳ Retrying in ${delay/1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
};

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        database: process.env.DATABASE_URL ? 'connected' : 'not configured'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal server error'
    });
});

// Start server only after database initialization
initializeApp().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 mambo ni vulai yawaa ${PORT} in ${process.env.NODE_ENV} mode`);
    });
});

