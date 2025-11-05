/**
 * Seed Super Admin User
 * Run this script once to create the initial super admin
 * Usage: node prisma/seed-superadmin.js
 */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const prisma = new PrismaClient();

async function createSuperAdmin() {
  try {
    // Check if super admin already exists
    const existingSuperAdmin = await prisma.user.findFirst({
      where: { role: 'SUPER_ADMIN' }
    });

    if (existingSuperAdmin) {
      console.log('⚠️  Super admin already exists:', existingSuperAdmin.email);
      return;
    }

    // Get credentials from environment or use defaults
    const email = process.env.SUPER_ADMIN_EMAIL || 'superadmin@cosmo.com';
    const password = process.env.SUPER_ADMIN_PASSWORD || 'SuperAdmin123!';
    const name = process.env.SUPER_ADMIN_NAME || 'Super Administrator';

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create super admin
    const superAdmin = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'SUPER_ADMIN',
        isActive: true
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    });

    console.log('✅ Super admin created successfully!');
    console.log('================================');
    console.log('📧 Email:', superAdmin.email);
    console.log('🔑 Password:', password);
    console.log('👤 Name:', superAdmin.name);
    console.log('================================');
    console.log('⚠️  IMPORTANT: Please change the password after first login!');
  } catch (error) {
    console.error('❌ Error creating super admin:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

createSuperAdmin();
