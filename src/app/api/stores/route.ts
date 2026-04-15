import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

const SLUG_REGEX = /^[a-z0-9][a-z0-9-]{1,38}[a-z0-9]$|^[a-z0-9]{3}$/;

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { slug, name, description, whatsappNumber, password } = body;

  if (!slug || !name || !whatsappNumber || !password) {
    return NextResponse.json({ error: 'slug, name, whatsappNumber and password are required' }, { status: 400 });
  }

  if (!SLUG_REGEX.test(slug) || slug.length < 3 || slug.length > 40) {
    return NextResponse.json(
      { error: 'Slug must be 3–40 characters, lowercase, alphanumeric and dashes only' },
      { status: 400 }
    );
  }

  const existing = await prisma.store.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json({ error: 'Slug already taken' }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const store = await prisma.store.create({
    data: {
      slug,
      name,
      description: description || null,
      whatsappNumber,
      password: hashedPassword,
      status: 'pending',
    },
  });

  return NextResponse.json({ id: store.id, slug: store.slug }, { status: 201 });
}
