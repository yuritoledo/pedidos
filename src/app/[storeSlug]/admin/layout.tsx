import { AdminNav } from '@/components/admin/AdminNav';

export default function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeSlug: string };
}) {
  return (
    <div className="min-h-screen bg-background">
      <AdminNav storeSlug={params.storeSlug} />
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {children}
      </main>
    </div>
  );
}
