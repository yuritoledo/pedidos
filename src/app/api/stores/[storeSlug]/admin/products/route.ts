import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).nullable(),
  price: z.number().positive(),
  image: z.string().url().nullable().or(z.literal('')),
  active: z.boolean().default(true),
});

async function verifyAuth(storeSlug: string): Promise<boolean> {
  const session = await getSession();
  return session === storeSlug;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { storeSlug: string } }
) {
  if (!(await verifyAuth(params.storeSlug))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const store = await prisma.store.findUnique({
    where: { slug: params.storeSlug },
    include: {
      products: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!store) {
    return NextResponse.json({ error: 'Store not found' }, { status: 404 });
  }

  return NextResponse.json({ products: store.products });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { storeSlug: string } }
) {
  if (!(await verifyAuth(params.storeSlug))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const validated = productSchema.safeParse(body);

  if (!validated.success) {
    return NextResponse.json({ error: validated.error.flatten() }, { status: 400 });
  }

  const store = await prisma.store.findUnique({
    where: { slug: params.storeSlug },
  });

  if (!store) {
    return NextResponse.json({ error: 'Store not found' }, { status: 404 });
  }

  const product = await prisma.product.create({
    data: {
      storeId: store.id,
      name: validated.data.name,
      description: validated.data.description,
      price: validated.data.price,
      image: validated.data.image || null,
      active: validated.data.active,
    },
  });

  return NextResponse.json({ product }, { status: 201 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { storeSlug: string } }
) {
  if (!(await verifyAuth(params.storeSlug))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { id, ...data } = body;
  const validated = productSchema.partial().safeParse(data);

  if (!validated.success) {
    return NextResponse.json({ error: validated.error.flatten() }, { status: 400 });
  }

  const product = await prisma.product.update({
    where: { id },
    data: validated.data,
  });

  return NextResponse.json({ product });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { storeSlug: string } }
) {
  if (!(await verifyAuth(params.storeSlug))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { id } = body;

  await prisma.product.update({
    where: { id },
    data: { active: false },
  });

  return NextResponse.json({ success: true });
}
