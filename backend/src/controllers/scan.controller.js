import prisma from '../utils/prisma.js';

// Log scan event
export const logScan = async (req, res, next) => {
  try {
    const { productId, sessionId, deviceInfo, location, referer, utmSource, utmMedium, utmCampaign } = req.body;

    const scan = await prisma.scan.create({
      data: {
        productId,
        sessionId,
        deviceInfo,
        ipAddress: req.ip,
        location,
        referer,
        utmSource,
        utmMedium,
        utmCampaign
      }
    });

    // Increment product scan count
    await prisma.product.update({
      where: { id: productId },
      data: { scanCount: { increment: 1 } }
    });

    res.status(201).json({ success: true, data: scan });
  } catch (error) {
    next(error);
  }
};

// Update scan interaction
export const updateScanInteraction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { duration, interacted } = req.body;

    const scan = await prisma.scan.update({
      where: { id: parseInt(id) },
      data: { duration, interacted }
    });

    res.json({ success: true, data: scan });
  } catch (error) {
    next(error);
  }
};
