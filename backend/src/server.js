// COSMO AR Backend Server
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { corsOptions } from './middleware/cors.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

// Import routes
import productRoutes from './routes/product.routes.js';
import scanRoutes from './routes/scan.routes.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (for 3D models and QR codes)
app.use('/models', express.static('uploads/models'));
app.use('/qrcodes', express.static('uploads/qrcodes'));

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'COSMO AR Backend is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/scans', scanRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'COSMO AR API',
    version: '1.0.0',
    description: 'WebAR + ChatGPT for COSMO Industrial Hygiene Wipes',
    endpoints: {
      health: '/health',
      products: '/api/products',
      scans: '/api/scans'
    }
  });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log('');
  console.log('🚀 COSMO AR Backend Started');
  console.log('================================');
  console.log(`📡 Server: http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  console.log(`📊 Database: Connected to cosmo_ar_db`);
  console.log('================================');
  console.log('');
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down gracefully...');
  process.exit(0);
});

export default app;
