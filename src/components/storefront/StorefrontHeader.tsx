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
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{store.name}</h1>
          {store.description && (
            <p className="text-sm text-muted-foreground">{store.description}</p>
          )}
        </div>
        <Button variant="outline" size="icon" onClick={onCartClick} className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {itemCount}
            </Badge>
          )}
        </Button>
      </div>
    </header>
  );
}
