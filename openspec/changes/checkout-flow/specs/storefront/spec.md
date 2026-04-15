## MODIFIED Requirements

### Requirement: Storefront passes WhatsApp config to cart
The storefront page SHALL include `whatsappNumber` and `messageTemplate` from the store record and pass them through to the cart drawer so customer orders use per-store configuration.

#### Scenario: Storefront loads with WhatsApp config
- **WHEN** `/{slug}/produtos` is rendered
- **THEN** `whatsappNumber` and `messageTemplate` from the store are available to the cart drawer client component
