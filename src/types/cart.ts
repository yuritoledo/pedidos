export interface CartItem {
  productId: string;
  quantity: number;
  product?: {
    name: string;
    price: number;
    image: string | null;
  };
}

export const CART_SESSION_COOKIE = 'cart-session';

export const CART_STORAGE_KEY = 'pedidos-cart';
