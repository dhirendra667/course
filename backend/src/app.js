import { config } from 'dotenv';
config();

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';

import errorMiddleware from './middlewares/error.middleware.js';
import swaggerSpec from './config/swagger.config.js';
import logger from './utils/logger.js';

const app = express();

// Security headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// Stricter limiter for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many auth attempts, please try again later.' },
});

// Built-in middlewares
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Third-party middlewares
app.use(cors({
  origin: [process.env.FRONTEND_URL || 'http://localhost:5173'],
  credentials: true,
}));
app.use(morgan('dev'));
app.use(cookieParser());

// Swagger docs
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'PrimeTrade API Docs',
}));

// Health check
app.get('/ping', (_req, res) => {
  res.status(200).json({ success: true, message: 'Pong 🏓', timestamp: new Date() });
});

// Routes
import userRoutes from './routes/user.routes.js';
import taskRoutes from './routes/task.routes.js';

app.use('/api/v1/user', authLimiter, userRoutes);
app.use('/api/v1/tasks', taskRoutes);

// 404 handler
app.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global error handler
app.use(errorMiddleware);

export default app;
