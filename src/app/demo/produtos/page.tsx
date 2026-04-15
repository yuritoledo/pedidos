import { StorefrontClient } from '@/components/storefront/StorefrontClient';

const DEMO_STORE = {
  id: 'demo',
  slug: 'demo',
  name: 'Loja Demo',
  description: 'Veja como sua loja pode ficar — produtos, carrinho e pedido pelo WhatsApp.',
  whatsappNumber: '5519991234567',
};

const DEMO_PRODUCTS = [
  { id: '1', name: 'Camiseta Básica', description: 'Algodão 100%, disponível em P, M e G', price: 59.90, active: true, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80' },
  { id: '2', name: 'Tênis Casual', description: 'Conforto para o dia a dia', price: 189.90, active: true, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
  { id: '3', name: 'Boné Snapback', description: 'Regulagem traseira ajustável', price: 49.90, active: true, image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&q=80' },
  { id: '4', name: 'Mochila Urbana', description: '20L, compartimento para notebook', price: 149.90, active: true, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80' },
  { id: '5', name: 'Óculos de Sol', description: 'Proteção UV400', price: 79.90, active: true, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80' },
  { id: '6', name: 'Relógio Minimalista', description: 'Pulseira de couro, caixa 40mm', price: 299.90, active: true, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80' },
];

export default function DemoProdutosPage() {
  return <StorefrontClient store={DEMO_STORE} products={DEMO_PRODUCTS} />;
}
