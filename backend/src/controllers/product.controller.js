import prisma from '../utils/prisma.js';
import QRCode from 'qrcode';

// Get all products
export const getProducts = async (req, res, next) => {
  try {
    const { category, status } = req.query;

    const products = await prisma.product.findMany({
      where: {
        ...(category && { category }),
        ...(status && { status }),
        isActive: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};

// Get product by SKU
export const getProductBySku = async (req, res, next) => {
  try {
    const { sku } = req.params;

    const product = await prisma.product.findUnique({
      where: { sku },
      include: { scans: { take: 10, orderBy: { createdAt: 'desc' } } }
    });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Increment view count
    await prisma.product.update({
      where: { id: product.id },
      data: { viewCount: { increment: 1 } }
    });

    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// Create product
export const createProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: req.body
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// Update product
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: req.body
    });

    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// Generate QR code for product
export const generateQR = async (req, res, next) => {
  try {
    const { sku } = req.params;

    const product = await prisma.product.findUnique({ where: { sku } });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const url = `${process.env.FRONTEND_URL}/ar/${sku}`;
    const qrCode = await QRCode.toDataURL(url, { width: 512, margin: 2 });

    await prisma.product.update({
      where: { sku },
      data: { qrCodeUrl: qrCode }
    });

    res.json({ success: true, qrCode, url });
  } catch (error) {
    next(error);
  }
};
