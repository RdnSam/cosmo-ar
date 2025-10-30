import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

export const productAPI = {
  getAll: () => api.get('/products'),
  getBySku: (sku) => api.get(`/products/${sku}`),
  generateQR: (sku) => api.get(`/products/${sku}/qr`)
};

export const scanAPI = {
  log: (data) => api.post('/scans', data),
  update: (id, data) => api.put(`/scans/${id}`, data)
};

export default api;
