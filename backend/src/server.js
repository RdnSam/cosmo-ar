/**
 * COSMO AR Backend Server
 * Main entry point for the application
 */
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { APP_CONFIG } from './config/app.config.js';
import { corsOptions } from './middleware/cors.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

// Import routes
import productRoutes from './routes/product.routes.js';
import scanRoutes from './routes/scan.routes.js';
import modelRoutes from './routes/model.routes.js';
import adminRoutes from './routes/admin.routes.js';

const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (for 3D models and QR codes)
app.use('/models', express.static(APP_CONFIG.upload.paths.models));
app.use('/qrcodes', express.static(APP_CONFIG.upload.paths.qrcodes));

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'COSMO AR Backend is running',
    timestamp: new Date().toISOString(),
    environment: APP_CONFIG.env,
    features: {
      chatgpt: APP_CONFIG.openai.enabled,
      rag: APP_CONFIG.pinecone.enabled,
      whatsapp: APP_CONFIG.twilio.enabled,
    }
  });
});

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/scans', scanRoutes);
app.use('/api/models', modelRoutes);
app.use('/api/admin', adminRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'COSMO AR API',
    version: '1.0.0',
    description: 'WebAR + ChatGPT for COSMO Industrial Hygiene Wipes',
    endpoints: {
      health: '/health',
      products: '/api/products',
      scans: '/api/scans',
      models: '/api/models',
      admin: '/api/admin'
    }
  });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(APP_CONFIG.server.port, APP_CONFIG.server.host, () => {
  console.log('');
  console.log('🚀 COSMO AR Backend Started');
  console.log('================================');
  console.log(`📡 Server: http://${APP_CONFIG.server.host}:${APP_CONFIG.server.port}`);
  console.log(`🌍 Environment: ${APP_CONFIG.env}`);
  console.log(`📊 Database: ${APP_CONFIG.database.url ? 'Connected' : 'Not configured'}`);
  console.log(`🤖 ChatGPT: ${APP_CONFIG.openai.enabled ? 'Enabled' : 'Disabled'}`);
  console.log(`🔍 RAG: ${APP_CONFIG.pinecone.enabled ? 'Enabled' : 'Disabled'}`);
  console.log(`💬 WhatsApp: ${APP_CONFIG.twilio.enabled ? 'Enabled' : 'Disabled'}`);
  console.log('================================');
  console.log('');
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down gracefully...');
  process.exit(0);
});

export default app;
