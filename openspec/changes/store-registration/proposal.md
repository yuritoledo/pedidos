## Why

The platform has no front door. Stores can only be created by manually inserting records into the database, making it impossible for anyone to self-register. This is the foundational blocker for running as a SaaS product.

## What Changes

- New public landing page at `/` that presents the product and drives sign-ups
- New public registration form where anyone can apply to create a store
- Store creation writes to the DB with `status: pending` — store is not yet live
- The `Store` model gains a `status` field (`pending | active | suspended`)
- Stores with `status !== active` return 404 on their storefront

## Capabilities

### New Capabilities
- `store-registration`: Public form to apply for a new store (slug, name, description, WhatsApp number, password). Creates a store with `status: pending`. Slug is validated for uniqueness and format.
- `landing-page`: Marketing landing page at `/` explaining the product and linking to the registration form.

### Modified Capabilities
- `storefront`: Storefront must gate on `store.status === active`. Pending or suspended stores return 404.

## Impact

- `prisma/schema.prisma` — add `status` enum/string field to `Store` model
- `src/app/page.tsx` — replace placeholder with landing page
- `src/app/register/page.tsx` — new public registration page
- `src/app/api/stores/route.ts` — new POST endpoint to create a store
- `src/app/[storeSlug]/produtos/page.tsx` — add status gate
- `src/app/[storeSlug]/admin/login/route.ts` — block login for non-active stores (pending/suspended should not access admin)
