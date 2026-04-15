## 1. Database

- [ ] 1.1 Add `whatsappNumber String` to `Store` model in `prisma/schema.prisma`
- [ ] 1.2 Add `messageTemplate String` with default Portuguese template to `Store` model
- [ ] 1.3 Add `isOpen Boolean @default(true)` to `Store` model
- [ ] 1.4 Run `prisma migrate dev --name add-store-settings-fields`

## 2. Settings API

- [ ] 2.1 Create `PATCH /api/stores/[storeSlug]/admin/settings/route.ts` — updates name, description, whatsappNumber, messageTemplate, isOpen. Auth-protected. Returns updated store.
- [ ] 2.2 Create `PATCH /api/stores/[storeSlug]/admin/password/route.ts` — accepts `{ currentPassword, newPassword }`, validates current password, updates if correct.

## 3. Settings Page

- [ ] 3.1 Create `src/app/[storeSlug]/admin/settings/page.tsx` — server component that fetches current store data and passes to client form
- [ ] 3.2 Build settings form with sections: General (name, description, isOpen toggle), WhatsApp (number + message template textarea with variable reference), Password change
- [ ] 3.3 Add "Variáveis disponíveis" helper text below template textarea listing all supported variables
- [ ] 3.4 Wire form to settings API and password API with success/error feedback

## 4. Admin Navigation

- [ ] 4.1 Add "Configurações" link to `src/components/admin/AdminNav.tsx`

## 5. Storefront Closed State

- [ ] 5.1 Pass `isOpen` from `store` to `StorefrontClient` in `src/app/[storeSlug]/produtos/page.tsx`
- [ ] 5.2 Update `StorefrontClient` to show "Loja temporariamente fechada" state when `isOpen` is `false`

## 6. Registration Seed

- [ ] 6.1 Update `POST /api/stores` (from store-registration change) to seed `messageTemplate` with default template and require `whatsappNumber` in the registration form
