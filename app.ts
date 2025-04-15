import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import authRoutes from './routes/auth';
import eventRoutes from './routes/events';
import postRoutes from './routes/posts';
import userRoutes from './routes/users';
import indexRoutes from './routes/index';
import { logger } from './middleware/logger';

// Load environment variables
dotenv.config();

const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(logger);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/auth', authRoutes);
app.use('/events', eventRoutes);
app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use('/', indexRoutes);

// MongoDB connection
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
    console.error('MongoDB URI is not defined in .env file.');
    process.exit(1);
}

mongoose.connect(mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
