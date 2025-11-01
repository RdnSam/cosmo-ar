/**
 * Backend Constants
 * Centralized constants to avoid magic strings/numbers
 */

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

// Product SKUs
export const PRODUCT_SKU = {
  OIL_ABSORBENT: 'OA-250',
  CHEMICAL_ABSORBENT: 'CA-250',
  GENERAL_PURPOSE: 'PSW',
};

// Scan Events
export const SCAN_EVENT = {
  QR_SCANNED: 'qr_scanned',
  AR_VIEWED: 'ar_viewed',
  AR_PLACED: 'ar_placed',
  CONTACT_CLICKED: 'contact_clicked',
};

// AR Interaction Types
export const AR_INTERACTION = {
  VIEW: 'view',
  ROTATE: 'rotate',
  SCALE: 'scale',
  PLACE: 'place',
  SCREENSHOT: 'screenshot',
};

// Chat Intent Types (Phase 2)
export const CHAT_INTENT = {
  PRODUCT_INFO: 'product_info',
  TECHNICAL_SPEC: 'technical_spec',
  USAGE_GUIDE: 'usage_guide',
  PRICING: 'pricing',
  CONTACT_SALES: 'contact_sales',
  GENERAL_QUERY: 'general_query',
};

// Error Messages
export const ERROR_MESSAGES = {
  // Generic
  INTERNAL_ERROR: 'An internal server error occurred',
  NOT_FOUND: 'Resource not found',
  BAD_REQUEST: 'Bad request',
  UNAUTHORIZED: 'Unauthorized access',

  // Products
  PRODUCT_NOT_FOUND: 'Product not found',
  INVALID_SKU: 'Invalid product SKU',

  // Scans
  SCAN_LOG_FAILED: 'Failed to log scan event',

  // Database
  DATABASE_ERROR: 'Database operation failed',
  CONNECTION_ERROR: 'Database connection error',

  // Validation
  VALIDATION_ERROR: 'Validation failed',
  MISSING_REQUIRED_FIELDS: 'Missing required fields',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  PRODUCT_CREATED: 'Product created successfully',
  PRODUCT_UPDATED: 'Product updated successfully',
  PRODUCT_DELETED: 'Product deleted successfully',
  SCAN_LOGGED: 'Scan event logged successfully',
  QR_GENERATED: 'QR code generated successfully',
};

// QR Code Settings
export const QR_CONFIG = {
  errorCorrectionLevel: 'H',
  type: 'image/png',
  width: 512,
  margin: 2,
  color: {
    dark: '#1e40af',
    light: '#ffffff',
  },
};

// Rate Limiting
export const RATE_LIMIT = {
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  MAX_REQUESTS: 100,
};

// File Upload Limits
export const UPLOAD_LIMITS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_FILES: 5,
  ALLOWED_MIME_TYPES: {
    IMAGES: ['image/jpeg', 'image/png', 'image/webp'],
    MODELS: ['model/gltf-binary', 'model/gltf+json'],
  },
};

export default {
  HTTP_STATUS,
  PRODUCT_SKU,
  SCAN_EVENT,
  AR_INTERACTION,
  CHAT_INTENT,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  QR_CONFIG,
  RATE_LIMIT,
  UPLOAD_LIMITS,
};
