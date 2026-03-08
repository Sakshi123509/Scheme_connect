import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import schemeRoutes from './routes/scheme.js';
import profileRoutes from './routes/profile.js';
import applicationRoutes from './routes/application.js';

const app = express();

app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/applications', applicationRoutes);

app.get('/', (req, res) => {
  res.send('SchemeConnect API is running');
});

export default app;
