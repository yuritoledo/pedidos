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

      <main className="container mx-auto px-3 py-5">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
            <span className="text-5xl">🛍️</span>
            <p className="text-base">Nenhum produto disponível ainda</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
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
        whatsappNumber={store.whatsappNumber}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onClearCart={clearCart}
      />
    </div>
  );
}
