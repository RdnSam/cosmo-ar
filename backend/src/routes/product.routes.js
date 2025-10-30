import express from 'express';
import { getProducts, getProductBySku, createProduct, updateProduct, generateQR } from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:sku', getProductBySku);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.get('/:sku/qr', generateQR);

export default router;
