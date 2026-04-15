import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <div className="max-w-xl space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">Crie sua loja no WhatsApp</h1>
        <p className="text-lg text-muted-foreground">
          Monte seu catálogo de produtos online em minutos. Seus clientes adicionam itens ao carrinho e pedem direto pelo WhatsApp — simples assim.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="text-base px-8">
            <Link href="/register">Quero minha loja</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-base px-8">
            <Link href="/demo/produtos">Ver demo</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
