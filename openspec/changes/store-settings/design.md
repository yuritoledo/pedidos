## Context

The `Store` model currently only has: `id`, `slug`, `name`, `description`, `password`, `status` (from store-registration). The WhatsApp number is hardcoded in `CartDrawer.tsx`. There is no settings UI.

The `checkout-flow` change (coming next) will consume `whatsappNumber` and `messageTemplate` from the store. This change creates those fields.

## Goals / Non-Goals

**Goals:**
- Store owner can update all store configuration from the admin panel
- WhatsApp number and message template are stored per-store in the DB
- Open/closed toggle lets store owners pause their storefront without deleting anything

**Non-Goals:**
- Store logo or visual customization (future)
- Slug change after registration (too complex — URLs would break)
- Email notifications

## Decisions

### 1. `messageTemplate` stored as plain text with `{{variable}}` syntax
Simple mustache-style replacement at render time. No template engine needed — a single `replace` loop handles all variables. Default template is seeded at registration time.

**Default template:**
```
Olá! Gostaria de fazer um pedido na {{store_name}}:

{{items}}

Total: {{total}}

---
Nome: {{customer_name}}
Telefone: {{customer_phone}}
Endereço: {{customer_address}}
```

### 2. `whatsappNumber` stored as raw digits (no formatting)
Store in E.164 format without `+` (e.g., `5519991889630`). Validated at save time. Displayed formatted in the UI.

### 3. Password change is a separate endpoint
`PATCH /api/stores/[slug]/admin/password` requires `currentPassword` + `newPassword`. Separate from general settings to reduce risk of accidental password wipes.

### 4. Settings PATCH replaces only provided fields
Partial update — only fields present in the request body are updated. Prevents accidental nullification.

### 5. `isOpen` defaults to `true`
New field added to schema with `@default(true)`. Existing stores remain open after migration.

## Risks / Trade-offs

- **Template variables are not validated** → If store owner uses an invalid variable name, it just renders as the literal string `{{bad_variable}}`. Acceptable UX for now.
- **No template preview in the UI** → Store owner can't see what the final message looks like before sending. A live preview would be ideal but is out of scope for this change.
