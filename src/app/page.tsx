export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">Pedidos</h1>
      <p className="text-muted-foreground text-center max-w-md">
        Fast, mobile-friendly multi-tenant storefront platform.
      </p>
      <p className="mt-4 text-sm text-muted-foreground">
        Visit /{'{'}storeSlug{'}'}/produtos to browse products
      </p>
    </main>
  );
}
