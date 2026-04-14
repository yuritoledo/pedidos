'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  active: boolean;
}

interface ProductListProps {
  storeSlug: string;
  onEdit: (product: Product) => void;
}

export function ProductList({ storeSlug, onEdit }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/stores/${storeSlug}/admin/products`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [storeSlug]);

  const handleDelete = async (id: string) => {
    await fetch(`/api/stores/${storeSlug}/admin/products`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchProducts();
  };

  if (loading) {
    return <p className="text-muted-foreground">Loading...</p>;
  }

  if (products.length === 0) {
    return <p className="text-muted-foreground">No products yet</p>;
  }

  return (
    <div className="space-y-2">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex items-center justify-between p-3 border rounded-lg"
        >
          <div className="min-w-0 flex-1">
            <p className="font-medium truncate">{product.name}</p>
            <p className="text-sm text-muted-foreground">
              {formatPrice(product.price)}
              {!product.active && ' (inactive)'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(product)}
            >
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDelete(product.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
