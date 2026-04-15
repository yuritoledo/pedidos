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
            sizes="(max-width: 640px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </div>
      ) : (
        <div className="w-full aspect-square bg-muted flex flex-col items-center justify-center gap-1">
          <svg className="w-10 h-10 text-muted-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <span className="text-xs text-muted-foreground/50">Sem foto</span>
        </div>
      )}
      <CardContent className="flex-1 p-3">
        <h3 className="font-semibold text-sm leading-tight line-clamp-2">{product.name}</h3>
        {product.description && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {product.description}
          </p>
        )}
        <span className="block text-base font-bold text-green-600 mt-2">{formatPrice(product.price)}</span>
      </CardContent>
      <CardFooter className="p-3 pt-0">
        <Button
          className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold text-sm min-h-[44px]"
          aria-label={`Adicionar ${product.name} ao carrinho`}
          onClick={() =>
            onAddToCart(product.id, {
              name: product.name,
              price: product.price,
              image: product.image,
            })
          }
        >
          + Adicionar
        </Button>
      </CardFooter>
    </Card>
  );
}
