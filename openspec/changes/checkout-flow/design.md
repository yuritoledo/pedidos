## Context

`CartDrawer.tsx` currently hardcodes both the phone number and the message format. The `store-settings` change adds `whatsappNumber` and `messageTemplate` to the `Store` model. This change wires those fields into the checkout experience and adds customer data collection before sending.

Cart remains entirely client-side (no DB write). This is intentional — see proposal.

## Goals / Non-Goals

**Goals:**
- Customer fills in name, phone, address before sending order
- Message uses per-store template with all variables resolved
- WhatsApp link uses per-store number

**Non-Goals:**
- Saving orders to the database
- Order confirmation screen
- Address validation or autocomplete
- Delivery fee calculation

## Decisions

### 1. Checkout modal as a second sheet (stacked on top of CartDrawer)
When customer taps "Pedir pelo WhatsApp", the cart drawer stays open and a checkout form sheet slides in. On confirm, both close and WhatsApp opens. This keeps the UX flow clear without navigation.

Alternative: Inline form at the bottom of CartDrawer. Rejected — clutters the cart view and makes it harder to distinguish between "browsing cart" and "committing to order."

### 2. Address is optional
Not all stores deliver. Some are pickup-only. Making address optional lets the template handle it gracefully — if `{{customer_address}}` is empty, the store owner just sees a blank line. Good enough for now.

### 3. `buildWhatsAppMessage(template, variables)` is a pure utility function
Lives in `src/lib/buildWhatsAppMessage.ts`. Takes template string + variables object, does a simple string replace for each `{{key}}`. No external dependency. Easy to test.

### 4. `items` variable renders as a bulleted list
Format: `• {quantity}x {product_name} — {price}`  
Each item on its own line. `total` is the grand total formatted with `formatPrice`.

### 5. whatsappNumber and messageTemplate passed as props all the way down
`produtos/page.tsx` → `StorefrontClient` → `CartDrawer`. No context or global state needed — the data is stable (doesn't change during a session).

## Risks / Trade-offs

- **Template with missing address renders `{{customer_address}}`** if not replaced properly → The `buildWhatsAppMessage` utility should replace missing/empty variables with an empty string, not leave the placeholder.
- **Customer phone is collected but not validated** → Light validation (min length) only. Strict E.164 validation is too friction-heavy for a WhatsApp-based flow.
