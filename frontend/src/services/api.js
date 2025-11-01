/**
 * API Service Layer
 * Centralized API calls with proper error handling & interceptors
 */
import axios from 'axios';
import { APP_CONFIG } from '../config/app.config.js';
import { API_ENDPOINTS, HTTP_STATUS } from '../config/constants.js';

// Create axios instance with config
const api = axios.create({
  baseURL: APP_CONFIG.api.baseUrl,
  timeout: APP_CONFIG.api.timeout,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if exists
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (APP_CONFIG.isDev) {
      console.log('🔵 API Request:', config.method.toUpperCase(), config.url);
    }

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    if (APP_CONFIG.isDev) {
      console.log('🟢 API Response:', response.status, response.config.url);
    }
    return response;
  },
  (error) => {
    const { response, config } = error;

    // Log error
    console.error('❌ API Error:', {
      url: config?.url,
      status: response?.status,
      message: response?.data?.message || error.message
    });

    // Handle specific status codes
    if (response?.status === HTTP_STATUS.UNAUTHORIZED) {
      // Clear auth and redirect to login
      localStorage.removeItem('auth_token');
      // window.location.href = '/login'; // Uncomment when auth is implemented
    }

    return Promise.reject(error);
  }
);

/**
 * Product API Service
 */
export const productAPI = {
  /**
   * Get all products
   * @returns {Promise<Array>} List of products
   */
  getAll: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.PRODUCTS.LIST);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
  },

  /**
   * Get product by SKU
   * @param {string} sku - Product SKU
   * @returns {Promise<Object>} Product details
   */
  getBySku: async (sku) => {
    try {
      const response = await api.get(API_ENDPOINTS.PRODUCTS.DETAIL(sku));
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch product ${sku}: ${error.message}`);
    }
  },

  /**
   * Generate QR code for product
   * @param {string} sku - Product SKU
   * @returns {Promise<string>} QR code data URL
   */
  generateQR: async (sku) => {
    try {
      const response = await api.get(API_ENDPOINTS.PRODUCTS.QR(sku));
      return response.data;
    } catch (error) {
      throw new Error(`Failed to generate QR for ${sku}: ${error.message}`);
    }
  }
};

/**
 * Scan Analytics API Service
 */
export const scanAPI = {
  /**
   * Log a scan event
   * @param {Object} data - Scan data
   * @returns {Promise<Object>} Scan record
   */
  log: async (data) => {
    try {
      const response = await api.post(API_ENDPOINTS.SCANS.TRACK, data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to log scan: ${error.message}`);
    }
  },

  /**
   * Update scan event
   * @param {number} id - Scan ID
   * @param {Object} data - Update data
   * @returns {Promise<Object>} Updated scan record
   */
  update: async (id, data) => {
    try {
      const response = await api.put(`${API_ENDPOINTS.SCANS.TRACK}/${id}`, data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update scan ${id}: ${error.message}`);
    }
  },

  /**
   * Get scan analytics
   * @returns {Promise<Object>} Analytics data
   */
  getAnalytics: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.SCANS.ANALYTICS);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch analytics: ${error.message}`);
    }
  }
};

/**
 * Health check
 */
export const healthAPI = {
  check: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.HEALTH);
      return response.data;
    } catch (error) {
      throw new Error(`Health check failed: ${error.message}`);
    }
  }
};

export default api;
