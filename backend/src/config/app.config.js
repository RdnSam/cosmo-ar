/**
 * Backend Application Configuration
 * Centralized config for environment variables and app settings
 */
import 'dotenv/config';

const ENV = process.env.NODE_ENV || 'development';
const IS_PRODUCTION = ENV === 'production';
const IS_DEVELOPMENT = ENV === 'development';

export const APP_CONFIG = {
  // Environment
  env: ENV,
  isDev: IS_DEVELOPMENT,
  isProd: IS_PRODUCTION,

  // Server
  server: {
    port: parseInt(process.env.PORT) || 3001,
    host: process.env.HOST || '0.0.0.0',
  },

  // Database
  database: {
    url: process.env.DATABASE_URL,
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'dev-secret-key-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },

  // CORS
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  },

  // File Upload
  upload: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/jpeg', 'image/png', 'model/gltf-binary', 'model/gltf+json'],
    paths: {
      models: 'uploads/models',
      qrcodes: 'uploads/qrcodes',
    }
  },

  // Phase 2 - ChatGPT
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    model: 'gpt-4-turbo-preview',
    enabled: !!process.env.OPENAI_API_KEY,
  },

  // Phase 3 - RAG + Vector DB
  pinecone: {
    apiKey: process.env.PINECONE_API_KEY || '',
    environment: process.env.PINECONE_ENVIRONMENT || 'us-east-1-aws',
    index: process.env.PINECONE_INDEX || 'cosmo-products',
    enabled: !!process.env.PINECONE_API_KEY,
  },

  // Phase 4 - WhatsApp
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID || '',
    authToken: process.env.TWILIO_AUTH_TOKEN || '',
    whatsappFrom: process.env.TWILIO_WHATSAPP_FROM || '',
    salesNumber: process.env.SALES_WHATSAPP_NUMBER || '',
    enabled: !!process.env.TWILIO_ACCOUNT_SID,
  },

  // Logging
  logging: {
    level: IS_PRODUCTION ? 'info' : 'debug',
    format: IS_PRODUCTION ? 'json' : 'pretty',
  }
};

// Validate required environment variables in production
if (IS_PRODUCTION) {
  const required = ['DATABASE_URL', 'JWT_SECRET', 'FRONTEND_URL'];
  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

export default APP_CONFIG;
