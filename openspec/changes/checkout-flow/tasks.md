## 1. Message Builder Utility

- [ ] 1.1 Create `src/lib/buildWhatsAppMessage.ts` — pure function `buildWhatsAppMessage(template: string, variables: Record<string, string>): string` that replaces all `{{key}}` occurrences, substituting empty string for missing/empty values

## 2. Storefront Data Flow

- [ ] 2.1 Update `src/app/[storeSlug]/produtos/page.tsx` to include `whatsappNumber` and `messageTemplate` in the store data passed to `StorefrontClient`
- [ ] 2.2 Update `StorefrontClient` to accept and pass `whatsappNumber` and `messageTemplate` props down to `CartDrawer`

## 3. Checkout Form

- [ ] 3.1 Create `src/components/storefront/CheckoutSheet.tsx` — a Sheet component with fields: name (required), phone (required), address (optional), and a confirm button
- [ ] 3.2 Add client-side validation: name and phone must be non-empty before confirm is enabled
- [ ] 3.3 On confirm, call `buildWhatsAppMessage` with all resolved variables and open `wa.me/{whatsappNumber}?text={encoded}` in a new tab, then close both sheets

## 4. Cart Drawer Integration

- [ ] 4.1 Update `CartDrawer` to accept `whatsappNumber: string` and `messageTemplate: string` props
- [ ] 4.2 Replace the inline `handleWhatsApp` function with logic that opens `CheckoutSheet` instead of directly calling `window.open`
- [ ] 4.3 Remove hardcoded phone number `5519991889630` from `CartDrawer`
