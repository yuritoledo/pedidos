# UTapy Alternative: Fast Mobile-Friendly Multi-Tenant Storefront

**Date:** 2026-04-13
**Status:** Draft

## Problem Statement

Existing UTapy platform is slow and not mobile-friendly. Need a fast, mobile-first multi-tenant storefront platform where each business gets their own URL (e.g., `/cristalsbo/produtos`).

## Requirements

### Functional
- Multi-tenant storefront at `/{storeSlug}/produtos`
- Product catalog with name, image, price, description
- Shopping cart with localStorage persistence
- Admin dashboard at `/{storeSlug}/admin` for product management
- No customer authentication required
- Admin authentication via store password

### Non-Functional
- Lighthouse score 90+ across all categories (Performance, Accessibility, SEO, Best Practices)
- Sub-second page loads on 3G networks
- Mobile-first responsive design
- Minimal JavaScript bundle on storefront (~50KB gzipped)

## Architecture

```
┌─────────────────────────────────────────────────┐
│                   Next.js App                    │
├──────────────────┬──────────────────────────────┤
│   Storefront     │     Admin Dashboard          │
│   (SSG/ISR)      │     (API Routes + SQLite)    │
│   /{slug}        │     /{slug}/admin            │
├──────────────────┴──────────────────────────────┤
│              Prisma ORM Layer                    │
├─────────────────────────────────────────────────┤
│              SQLite Database                     │
│  (stores, products, cart items)                 │
└─────────────────────────────────────────────────┘
```

### Key Decisions
- **Incremental Static Regeneration (ISR)** for storefront pages with `revalidate: 60`
- **localStorage + cookie** for cart persistence (no customer auth)
- **Session-based auth** for admin (store password)
- **Next.js Image optimization** for responsive images
- **shadcn/ui** for accessible, mobile-first components

## Database Schema

```
┌──────────────┐       ┌───────────────┐       ┌──────────────┐
│    Store     │       │    Product    │       │  CartItem    │
├──────────────┤       ├───────────────┤       ├──────────────┤
│ id           │──┐    │ id            │   ┌───│ id           │
│ slug         │  └───<│ storeId      │   │   │ sessionId     │
│ name         │       │ name          │   │   │ productId     │──> Product.id
│ description  │       │ description   │   │   │ quantity      │
│ password     │       │ price         │   └───│ createdAt     │
│ createdAt    │       │ image         │       └──────────────┘
└──────────────┘       │ active        │
                       │ createdAt     │
                       └───────────────┘
```

### Schema Details

**Store**
- `id`: String (UUID, primary key)
- `slug`: String (unique, URL identifier)
- `name`: String
- `description`: String (optional)
- `password`: String (hashed)
- `createdAt`: DateTime

**Product**
- `id`: String (UUID, primary key)
- `storeId`: String (foreign key to Store)
- `name`: String
- `description`: String (optional)
- `price`: Decimal
- `image`: String (URL/path, optional)
- `active`: Boolean (default true)
- `createdAt`: DateTime

**CartItem**
- `id`: String (UUID, primary key)
- `sessionId`: String (anonymous cart identifier from cookie)
- `productId`: String (foreign key to Product)
- `quantity`: Int (default 1)
- `createdAt`: DateTime

## Data Flow

### Storefront Flow
1. User visits `/{storeSlug}/produtos`
2. Next.js ISR fetches store + products from Prisma
3. Static page served (<100ms on 3G)
4. User adds to cart → localStorage + sync to cookie sessionId
5. Cart persists across sessions via cookie

### Admin Flow
1. Store owner visits `/{storeSlug}/admin`
2. Login with store password
3. Dashboard: CRUD products, view cart stats
4. Product update → ISR revalidation triggered

## Components

### Storefront
- `StorefrontLayout` - Mobile-first responsive grid for products
- `ProductCard` - Image, name, price, add-to-cart button
- `CartDrawer` - Slide-out cart panel (bottom sheet on mobile)

### Admin
- `AdminPanel` - Product list, add/edit form
- `AdminLogin` - Password authentication form

## Performance Strategy

- ISR with `revalidate: 60` (revalidate every 60s)
- Image lazy loading + Next.js `<Image>` with responsive sizes
- Code splitting per route
- Minimal JS on storefront (~50KB gzipped)
- Static generation for all storefront pages
- Tailwind CSS with PurgeCSS for minimal CSS bundle

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Database:** SQLite
- **ORM:** Prisma
- **Styling:** Tailwind CSS + shadcn/ui
- **Deployment:** Vercel or self-hosted
- **Authentication:** Session-based (cookie) for admin

## Non-Goals

- Payment processing / checkout
- Order management
- Customer accounts / authentication
- Multi-language support
- Analytics / reporting
