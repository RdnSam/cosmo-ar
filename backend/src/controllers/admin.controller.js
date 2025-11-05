/**
 * Admin Controller
 * Manage users, admins, and system settings
 */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma.js';
import { APP_CONFIG } from '../config/app.config.js';

// Super Admin: Create new admin/user
export const createUser = async (req, res, next) => {
  try {
    const { email, password, name, role } = req.body;

    // Validation
    if (!email || !password || !name || !role) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: email, password, name, role'
      });
    }

    // Validate role
    const validRoles = ['ADMIN', 'SALES', 'MARKETING', 'VIEWER'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: `Invalid role. Must be one of: ${validRoles.join(', ')}`
      });
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true
      }
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// Get all users (with filters)
export const getUsers = async (req, res, next) => {
  try {
    const { role, isActive } = req.query;

    const users = await prisma.user.findMany({
      where: {
        ...(role && { role }),
        ...(isActive !== undefined && { isActive: isActive === 'true' })
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// Get user by ID
export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// Update user
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, role, isActive, password } = req.body;

    // Prevent updating to SUPER_ADMIN
    if (role === 'SUPER_ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Cannot set role to SUPER_ADMIN'
      });
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent super admin from being modified
    if (existingUser.role === 'SUPER_ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Cannot modify super admin account'
      });
    }

    // Build update data
    const updateData = {};
    if (name) updateData.name = name;
    if (role) updateData.role = role;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        updatedAt: true
      }
    });

    res.json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// Delete user (soft delete via isActive)
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent deleting super admin
    if (user.role === 'SUPER_ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Cannot delete super admin account'
      });
    }

    await prisma.user.update({
      where: { id: parseInt(id) },
      data: { isActive: false }
    });

    res.json({
      success: true,
      message: 'User deactivated successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Login endpoint
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      APP_CONFIG.jwt.secret,
      { expiresIn: APP_CONFIG.jwt.expiresIn }
    );

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get current user profile
export const getProfile = async (req, res, next) => {
  try {
    res.json({
      success: true,
      data: req.user
    });
  } catch (error) {
    next(error);
  }
};
