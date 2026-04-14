import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { setSession } from '@/lib/session';

export async function POST(
  request: NextRequest,
  { params }: { params: { storeSlug: string } }
) {
  const body = await request.json();
  const password = body.password;

  if (!password) {
    return NextResponse.json({ error: 'Password required' }, { status: 400 });
  }

  const store = await prisma.store.findUnique({
    where: { slug: params.storeSlug },
  });

  if (!store) {
    return NextResponse.json({ error: 'Store not found' }, { status: 404 });
  }

  const valid = await bcrypt.compare(password, store.password);

  if (!valid) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  await setSession(store.slug);

  return NextResponse.json({ success: true });
}
