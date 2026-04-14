import { notFound } from 'next/navigation';
import { StorefrontClient } from '@/components/storefront/StorefrontClient';
import { Product, Store } from '@/types/product';

interface ProdutosPageProps {
  params: { storeSlug: string };
}

async function fetchStoreData(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/stores/${slug}/products`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export async function generateStaticParams() {
  return [];
}

export default async function ProdutosPage({ params }: ProdutosPageProps) {
  const data = await fetchStoreData(params.storeSlug);

  if (!data) {
    notFound();
  }

  const store: Store = data.store;
  const products: Product[] = data.products;

  return <StorefrontClient store={store} products={products} />;
}
