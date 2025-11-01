/**
 * Application Constants
 * Centralized constants to avoid magic strings/numbers
 */

// Product SKUs
export const PRODUCT_SKU = {
  OIL_ABSORBENT: 'OA-250',
  CHEMICAL_ABSORBENT: 'CA-250',
  GENERAL_PURPOSE: 'PSW',
};

// Product Info
export const PRODUCTS = [
  {
    sku: PRODUCT_SKU.OIL_ABSORBENT,
    name: 'Oil Absorbent Wipes',
    icon: '🛢️',
    color: 'from-orange-400 to-red-500',
    model: 'TissueCosmo.glb'
  },
  {
    sku: PRODUCT_SKU.CHEMICAL_ABSORBENT,
    name: 'Chemical Absorbent',
    icon: '🧪',
    color: 'from-green-400 to-teal-500',
    model: 'TissueCosmo.glb'
  },
  {
    sku: PRODUCT_SKU.GENERAL_PURPOSE,
    name: 'General Purpose',
    icon: '🧽',
    color: 'from-purple-400 to-pink-500',
    model: 'TissueCosmo.glb'
  }
];

// AR Features
export const AR_FEATURES = [
  {
    icon: '🎨',
    title: '360° View',
    desc: 'Rotate & explore every angle'
  },
  {
    icon: '📏',
    title: 'True Scale',
    desc: 'See actual product size'
  },
  {
    icon: '🏠',
    title: 'Place in Space',
    desc: 'Visualize in your environment'
  },
  {
    icon: '⚡',
    title: 'Instant Load',
    desc: 'No app download needed'
  }
];

// How it works steps
export const HOW_IT_WORKS_STEPS = [
  { step: '1', icon: '📱', text: 'Scan QR with camera' },
  { step: '2', icon: '🌐', text: 'Browser opens AR view' },
  { step: '3', icon: '🎨', text: 'Interact with 3D model' },
  { step: '4', icon: '📍', text: 'Place in your space' }
];

// API Endpoints
export const API_ENDPOINTS = {
  PRODUCTS: {
    LIST: '/products',
    DETAIL: (sku) => `/products/${sku}`,
    QR: (sku) => `/products/${sku}/qr`,
  },
  SCANS: {
    TRACK: '/scans',
    ANALYTICS: '/scans/analytics',
  },
  HEALTH: '/health'
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

// QR Code Settings
export const QR_CONFIG = {
  width: 320,
  margin: 2,
  color: {
    dark: '#1e40af',
    light: '#ffffff'
  }
};

export default {
  PRODUCT_SKU,
  PRODUCTS,
  AR_FEATURES,
  HOW_IT_WORKS_STEPS,
  API_ENDPOINTS,
  HTTP_STATUS,
  QR_CONFIG
};
