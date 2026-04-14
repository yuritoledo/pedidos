'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ProductForm } from '@/components/admin/ProductForm';
import { ProductList } from '@/components/admin/ProductList';

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  active: boolean;
}

export default function AdminDashboard({
  params,
}: {
  params: { storeSlug: string };
}) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">
          {editingProduct ? 'Edit Product' : 'Add Product'}
        </h2>
        <ProductForm
          storeSlug={params.storeSlug}
          product={editingProduct ?? undefined}
          onSuccess={() => {
            setEditingProduct(null);
            setRefreshKey((k) => k + 1);
          }}
        />
        {editingProduct && (
          <Button
            variant="ghost"
            className="mt-2"
            onClick={() => setEditingProduct(null)}
          >
            Cancel Edit
          </Button>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Products</h2>
        <ProductList
          key={refreshKey}
          storeSlug={params.storeSlug}
          onEdit={setEditingProduct}
        />
      </div>
    </div>
  );
}
