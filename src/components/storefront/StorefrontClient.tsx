'use client';

import { useState } from 'react';
import { Store, Product } from '@/types/product';
import { StorefrontHeader } from './StorefrontHeader';
import { ProductCard } from './ProductCard';
import { CartDrawer } from './CartDrawer';
import { useCart } from '@/hooks/useCart';

interface StorefrontClientProps {
  store: Store;
  products: Product[];
}

export function StorefrontClient({ store, products }: StorefrontClientProps) {
  const [cartOpen, setCartOpen] = useState(false);
  const { items, addItem, removeItem, updateQuantity, clearCart, total, itemCount } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <StorefrontHeader
        store={store}
        itemCount={itemCount}
        onCartClick={() => setCartOpen(true)}
      />

      <main className="container mx-auto px-4 py-6">
        {products.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            No products available yet
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addItem}
              />
            ))}
          </div>
        )}
      </main>

      <CartDrawer
        open={cartOpen}
        onOpenChange={setCartOpen}
        items={items}
        total={total}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onClearCart={clearCart}
      />
    </div>
  );
}
