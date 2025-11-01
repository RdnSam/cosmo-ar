import express from 'express';
import { getAvailableModels } from '../controllers/model.controller.js';

const router = express.Router();

router.get('/', getAvailableModels);

export default router;
