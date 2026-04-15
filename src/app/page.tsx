export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

async function ensureDemoStore() {
  const existing = await prisma.store.findUnique({ where: { slug: 'demo' } });
  if (existing) return;

  const hashedPassword = await bcrypt.hash('demo123', 10);
  await prisma.store.create({
    data: {
      slug: 'demo',
      name: 'Loja Demo',
      description: 'Veja como sua loja pode ficar — produtos, carrinho e pedido pelo WhatsApp.',
      whatsappNumber: '5519991234567',
      password: hashedPassword,
      status: 'active',
      products: {
        create: [
          { name: 'Camiseta Básica', description: 'Algodão 100%, disponível em P, M e G', price: 59.90, active: true, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80' },
          { name: 'Tênis Casual', description: 'Conforto para o dia a dia', price: 189.90, active: true, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
          { name: 'Boné Snapback', description: 'Regulagem traseira ajustável', price: 49.90, active: true, image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&q=80' },
          { name: 'Mochila Urbana', description: '20L, compartimento para notebook', price: 149.90, active: true, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80' },
          { name: 'Óculos de Sol', description: 'Proteção UV400', price: 79.90, active: true, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80' },
          { name: 'Relógio Minimalista', description: 'Pulseira de couro, caixa 40mm', price: 299.90, active: true, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80' },
        ],
      },
    },
  });
}

export default async function Home() {
  await ensureDemoStore();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <div className="max-w-xl space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">Crie sua loja no WhatsApp</h1>
        <p className="text-lg text-muted-foreground">
          Monte seu catálogo de produtos online em minutos. Seus clientes adicionam itens ao carrinho e pedem direto pelo WhatsApp — simples assim.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="text-base px-8">
            <Link href="/register">Quero minha loja</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-base px-8">
            <Link href="/demo/produtos">Ver demo</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
