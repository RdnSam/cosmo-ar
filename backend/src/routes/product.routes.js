import express from 'express';
import { getProducts, getProductBySku, createProduct, updateProduct, generateQR, generateAllQR } from '../controllers/product.controller.js';

const router = express.Router();

// QR Generation routes (harus sebelum :sku routes)
router.post('/qr/generate-all', generateAllQR);

// CRUD routes
router.get('/', getProducts);
router.get('/:sku', getProductBySku);
router.post('/', createProduct);
router.put('/:id', updateProduct);

// Single QR generation
router.get('/:sku/qr', generateQR);

export default router;
