## Why

Store owners have no way to configure their store after creation. Critical settings like WhatsApp number and message template are either hardcoded or missing from the data model entirely. Without this, every store on the platform sends orders to the same phone number — the app is broken for multi-tenant use.

## What Changes

- New "Configurações" section in the store admin panel
- Store owner can edit: store name, description, WhatsApp number, message template, open/closed status
- Store owner can change their admin password
- `Store` model gains: `whatsappNumber`, `messageTemplate`, `isOpen` fields
- Message template supports variables: `{{store_name}}`, `{{items}}`, `{{total}}`, `{{customer_name}}`, `{{customer_phone}}`, `{{customer_address}}`

## Capabilities

### New Capabilities
- `store-settings`: Settings page in the admin panel. Store owner can edit all store configuration. Changes take effect immediately.

### Modified Capabilities
- `storefront`: Storefront must respect `store.isOpen`. When closed, show a "loja fechada" state instead of the product grid.

## Impact

- `prisma/schema.prisma` — add `whatsappNumber`, `messageTemplate`, `isOpen` to `Store`
- `src/app/[storeSlug]/admin/settings/page.tsx` — new settings page
- `src/app/api/stores/[storeSlug]/admin/settings/route.ts` — new PATCH endpoint
- `src/app/api/stores/[storeSlug]/admin/password/route.ts` — new PATCH endpoint for password change
- `src/components/storefront/StorefrontClient.tsx` — gate on `isOpen`
- `src/app/[storeSlug]/produtos/page.tsx` — pass `isOpen` to client
