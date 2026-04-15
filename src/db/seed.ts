import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('demo123', 10);

  const store = await prisma.store.upsert({
    where: { slug: 'demo' },
    update: {},
    create: {
      slug: 'demo',
      name: 'Demo Store',
      description: 'A demo storefront',
      password: hashedPassword,
      whatsappNumber: '5519991234567',
      status: 'active',
      products: {
        create: [
          { name: 'Product 1', description: 'First product', price: 29.99, active: true },
          { name: 'Product 2', description: 'Second product', price: 49.99, active: true },
          { name: 'Product 3', description: 'Third product', price: 19.99, active: true },
        ],
      },
    },
  });

  console.log('Seed completed:', store);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
