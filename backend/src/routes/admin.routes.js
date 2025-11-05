/**
 * Admin Routes
 * Protected routes for user management
 */
import express from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  login,
  getProfile
} from '../controllers/admin.controller.js';
import { authenticate, isSuperAdmin, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/login', login);

// Protected routes - require authentication
router.get('/profile', authenticate, getProfile);

// Super Admin only routes
router.post('/users', authenticate, isSuperAdmin, createUser);
router.get('/users', authenticate, isAdmin, getUsers);
router.get('/users/:id', authenticate, isAdmin, getUserById);
router.put('/users/:id', authenticate, isSuperAdmin, updateUser);
router.delete('/users/:id', authenticate, isSuperAdmin, deleteUser);

export default router;
