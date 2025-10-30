import express from 'express';
import { logScan, updateScanInteraction } from '../controllers/scan.controller.js';

const router = express.Router();

router.post('/', logScan);
router.put('/:id', updateScanInteraction);

export default router;
