import { Store } from '@/types/product';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface StorefrontHeaderProps {
  store: Store;
  itemCount: number;
  onCartClick: () => void;
}

export function StorefrontHeader({ store, itemCount, onCartClick }: StorefrontHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-xl font-bold leading-tight truncate">{store.name}</h1>
          {store.description && (
            <p className="text-xs text-muted-foreground truncate">{store.description}</p>
          )}
        </div>
        <Button
          onClick={onCartClick}
          className="relative flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold shrink-0 min-h-[44px] px-4"
          aria-label="Carrinho de compras"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="hidden sm:inline">Carrinho</span>
          {itemCount > 0 && (
            <Badge className="bg-white text-green-700 font-bold text-xs px-1.5 min-w-[20px] h-5 flex items-center justify-center">
              {itemCount}
            </Badge>
          )}
        </Button>
      </div>
    </header>
  );
}
