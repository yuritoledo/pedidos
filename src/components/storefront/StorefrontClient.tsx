'use client';

import { Store, Product } from '@/types/product';

interface StorefrontClientProps {
  store: Store;
  products: Product[];
}

export function StorefrontClient({ store, products }: StorefrontClientProps) {
  return (
    <div className="min-h-screen bg-background">
      <p>Store: {store.name}</p>
      <p>Products: {products.length}</p>
    </div>
  );
}
