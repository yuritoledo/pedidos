import Image from 'next/image';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onAddToCart: (id: string, product: { name: string; price: number; image: string | null }) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden">
      {product.image ? (
        <div className="relative w-full aspect-square bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="w-full aspect-square bg-muted flex items-center justify-center">
          <span className="text-muted-foreground text-4xl">📦</span>
        </div>
      )}
      <CardContent className="flex-1 p-4">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        {product.description && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {product.description}
          </p>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <span className="text-xl font-bold">{formatPrice(product.price)}</span>
        <Button
          size="sm"
          onClick={() =>
            onAddToCart(product.id, {
              name: product.name,
              price: product.price,
              image: product.image,
            })
          }
        >
          Add
        </Button>
      </CardFooter>
    </Card>
  );
}
