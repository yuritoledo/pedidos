## Why

The current "Pedir pelo WhatsApp" button has two problems: it sends orders to a hardcoded phone number (breaking multi-tenancy), and it sends zero customer information — no name, no address, no phone. Store owners receive an order without knowing who placed it or where to deliver.

## What Changes

- Before opening WhatsApp, a modal/sheet collects: customer name, phone, delivery address (optional)
- The WhatsApp message is built from the store's `messageTemplate` (introduced in `store-settings`) with all variables resolved
- The WhatsApp `wa.me` link uses the store's `whatsappNumber` from the DB (not a hardcoded value)
- Cart state remains local (browser-only — no DB persistence)

## Capabilities

### New Capabilities
- `checkout-flow`: Pre-WhatsApp customer info collection. A sheet/modal appears when customer taps "Pedir pelo WhatsApp". After filling in name, phone, address and confirming, the WhatsApp link opens with the full message built from the store's template.

### Modified Capabilities
- `storefront`: The storefront page must pass `whatsappNumber` and `messageTemplate` from the store to the client component so the cart drawer can use them.

## Impact

- `src/components/storefront/CartDrawer.tsx` — replace hardcoded WhatsApp logic with template-based, per-store number
- `src/components/storefront/StorefrontClient.tsx` — pass `whatsappNumber` and `messageTemplate` props
- `src/app/[storeSlug]/produtos/page.tsx` — include `whatsappNumber` and `messageTemplate` in store data passed to client
- `src/lib/buildWhatsAppMessage.ts` — new utility: resolves template variables into final message string
