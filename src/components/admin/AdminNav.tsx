'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, Store } from 'lucide-react';

interface AdminNavProps {
  storeSlug: string;
}

export function AdminNav({ storeSlug }: AdminNavProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch(`/api/stores/${storeSlug}/admin/logout`, { method: 'POST' });
    router.push(`/${storeSlug}/admin/login`);
    router.refresh();
  };

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between max-w-4xl">
        <Link href={`/${storeSlug}/admin`} className="flex items-center gap-2 font-bold">
          <Store className="h-5 w-5" />
          <span>Admin</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/${storeSlug}/produtos`}>View Store</Link>
          </Button>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-1" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
