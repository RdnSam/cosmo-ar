import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Sample COSMO products
  const products = [
    {
      sku: 'OA-250',
      name: 'COSMO Oil Absorbent Wipes OA-250',
      category: 'OIL',
      description: 'High-performance oil absorbent wipes for industrial spills and maintenance',
      composition: 'Meltblown Polypropylene',
      sheetSize: '40cm x 50cm',
      rollSize: '30cm x 40m',
      capacity: 'Absorbs up to 10x its weight in oil',
      halal: true,
      lppomMui: true,
      modelUrl: '/models/oa-250.glb',
      posterUrl: '/images/oa-250.jpg',
      price: 250000,
      status: 'ACTIVE',
      isActive: true
    },
    {
      sku: 'CA-250',
      name: 'COSMO Chemical Absorbent Wipes CA-250',
      category: 'CHEMICAL',
      description: 'Chemical-resistant absorbent wipes for hazardous material cleanup',
      composition: 'Meltblown Polypropylene',
      sheetSize: '40cm x 50cm',
      rollSize: '30cm x 40m',
      capacity: 'Absorbs acids, bases, and solvents',
      halal: true,
      lppomMui: true,
      modelUrl: '/models/ca-250.glb',
      posterUrl: '/images/ca-250.jpg',
      price: 275000,
      status: 'ACTIVE',
      isActive: true
    },
    {
      sku: 'PSW',
      name: 'COSMO General Purpose Wipes PSW',
      category: 'GENERAL',
      description: 'Multi-purpose industrial cleaning wipes for everyday use',
      composition: 'Non-woven Fabric',
      sheetSize: '30cm x 40cm',
      rollSize: '25cm x 35m',
      capacity: 'General purpose absorption',
      halal: true,
      lppomMui: true,
      modelUrl: '/models/psw.glb',
      posterUrl: '/images/psw.jpg',
      price: 150000,
      status: 'ACTIVE',
      isActive: true
    }
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { sku: product.sku },
      update: product,
      create: product
    });
    console.log(`✅ Created/Updated product: ${product.sku}`);
  }

  console.log('✨ Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
