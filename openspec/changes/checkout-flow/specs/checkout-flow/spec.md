## ADDED Requirements

### Requirement: Customer info collection before WhatsApp
Before opening WhatsApp, the system SHALL prompt the customer to provide their name, phone number, and optionally their delivery address.

#### Scenario: Customer taps "Pedir pelo WhatsApp" with items in cart
- **WHEN** customer taps "Pedir pelo WhatsApp" in the cart drawer
- **THEN** a checkout form sheet appears requesting: name (required), phone (required), address (optional)

#### Scenario: Customer submits complete info
- **WHEN** customer fills required fields and confirms
- **THEN** system builds the WhatsApp message using the store's template, resolves all variables, and opens `wa.me/{whatsappNumber}?text={encodedMessage}` in a new tab

#### Scenario: Customer submits without required fields
- **WHEN** customer attempts to confirm without filling name or phone
- **THEN** system shows field-level validation errors and does not open WhatsApp

#### Scenario: Customer cancels checkout
- **WHEN** customer closes the checkout form without confirming
- **THEN** cart drawer is shown again with items intact, nothing is sent

### Requirement: Template variable resolution
The system SHALL resolve all `{{variable}}` placeholders in the store's message template before building the WhatsApp link.

#### Scenario: All variables present
- **WHEN** template contains `{{store_name}}`, `{{items}}`, `{{total}}`, `{{customer_name}}`, `{{customer_phone}}`, `{{customer_address}}`
- **THEN** each is replaced with its corresponding value

#### Scenario: Empty optional variable
- **WHEN** customer leaves address empty and template contains `{{customer_address}}`
- **THEN** `{{customer_address}}` is replaced with an empty string (not left as a literal placeholder)

#### Scenario: Items variable format
- **WHEN** `{{items}}` is resolved
- **THEN** it renders as one line per cart item in the format: `• {quantity}x {product_name} — {price}`

### Requirement: Per-store WhatsApp number
The WhatsApp link SHALL use the `whatsappNumber` stored on the store, not a hardcoded value.

#### Scenario: Order sent to correct store number
- **WHEN** customer confirms checkout on any store's storefront
- **THEN** the `wa.me` URL uses that store's `whatsappNumber`
