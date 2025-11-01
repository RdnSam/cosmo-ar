/**
 * Application Configuration
 * Centralized config for the entire application
 */

const ENV = import.meta.env.MODE || 'development';
const IS_PRODUCTION = ENV === 'production';
const IS_DEVELOPMENT = ENV === 'development';

export const APP_CONFIG = {
  // App Info
  name: import.meta.env.VITE_APP_NAME || 'COSMO AR Experience',
  version: '1.0.0',
  description: 'WebAR + ChatGPT for COSMO Industrial Hygiene Wipes',

  // Environment
  env: ENV,
  isDev: IS_DEVELOPMENT,
  isProd: IS_PRODUCTION,

  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
    timeout: 30000, // 30 seconds
    retryAttempts: 3,
  },

  // URLs - dari environment variables
  urls: {
    frontend: import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173',
    backend: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001',
    models: `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'}/models`,
  },

  // AR Settings
  ar: {
    defaultCameraOrbit: '0deg 75deg 105%',
    autoRotateSpeed: '30deg',
    autoRotateDelay: 0,
    modes: 'webxr scene-viewer quick-look',
  },

  // Feature Flags
  features: {
    chatbot: false, // Phase 2
    rag: false,     // Phase 3
    whatsapp: false // Phase 4
  }
};

export default APP_CONFIG;
