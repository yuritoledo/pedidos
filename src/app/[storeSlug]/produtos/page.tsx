import { notFound } from 'next/navigation';
import { StorefrontClient } from '@/components/storefront/StorefrontClient';
import prisma from '@/lib/prisma';

interface ProdutosPageProps {
  params: { storeSlug: string };
}

export default async function ProdutosPage({ params }: ProdutosPageProps) {
  const store = await prisma.store.findUnique({
    where: { slug: params.storeSlug },
    include: {
      products: {
        where: { active: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!store || store.status !== 'active') {
    notFound();
  }

  return (
    <StorefrontClient
      store={{ id: store.id, slug: store.slug, name: store.name, description: store.description }}
      products={store.products.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        image: p.image,
        active: p.active,
      }))}
    />
  );
}
