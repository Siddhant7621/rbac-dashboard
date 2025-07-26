// backend/src/app.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js'; // Note the .js extension
import userRoutes from './routes/user.js'; // Note the .js extension
import contentRoutes from './routes/content.js'; // Note the .js extension
import logRoutes from './routes/log.js'; // Note the .js extension

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json()); // Body parser for JSON
app.use(cors()); // Enable CORS for all origins (adjust for production)

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/logs', logRoutes);

// Basic error handling for unauthorized access
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    next(err);
});

export default app;