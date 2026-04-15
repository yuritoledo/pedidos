## 1. Database

- [x] 1.1 Add `status String @default("active")` field to `Store` model in `prisma/schema.prisma`
- [x] 1.2 Run `prisma migrate dev --name add-store-status` to generate and apply migration

## 2. API

- [x] 2.1 Create `POST /api/stores` route that accepts `{ slug, name, description, whatsappNumber, password }`, validates slug format and uniqueness, and creates store with `status: pending`
- [x] 2.2 Update `src/app/api/stores/[storeSlug]/admin/login/route.ts` to check `store.status === active` and return 403 with appropriate message for pending/suspended stores

## 3. Storefront Gate

- [x] 3.1 Update `src/app/[storeSlug]/produtos/page.tsx` to call `notFound()` when `store.status !== active`

## 4. Registration Page

- [x] 4.1 Create `src/app/register/page.tsx` with form fields: store name, slug, description (optional), WhatsApp number, password
- [x] 4.2 Add client-side slug validation (format) and server-side uniqueness check via the API
- [x] 4.3 Show confirmation message on success: "Sua loja foi cadastrada e está em análise"

## 5. Landing Page

- [x] 5.1 Replace `src/app/page.tsx` placeholder with a marketing landing page: headline, brief product description, CTA button → `/register`
