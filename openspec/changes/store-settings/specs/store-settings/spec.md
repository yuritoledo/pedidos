## ADDED Requirements

### Requirement: Store settings page
The store admin panel SHALL include a settings page at `/{slug}/admin/settings` where the store owner can edit store configuration.

#### Scenario: Settings page loads with current values
- **WHEN** an authenticated store owner navigates to `/{slug}/admin/settings`
- **THEN** the form is pre-populated with current store name, description, WhatsApp number, message template, and open/closed status

#### Scenario: Saving general settings
- **WHEN** store owner updates name, description, WhatsApp number, or message template and saves
- **THEN** system persists all changed fields and shows a success message

#### Scenario: WhatsApp number validation
- **WHEN** store owner submits a WhatsApp number that is not a valid Brazilian phone number (10–11 digits)
- **THEN** system returns a validation error: "Número de WhatsApp inválido"

### Requirement: Message template with variables
The message template SHALL support the following variables that are replaced at order send time: `{{store_name}}`, `{{items}}`, `{{total}}`, `{{customer_name}}`, `{{customer_phone}}`, `{{customer_address}}`.

#### Scenario: Template with all variables renders correctly
- **WHEN** a customer sends an order and the store has a custom message template
- **THEN** all `{{variable}}` placeholders in the template are replaced with their corresponding values before opening WhatsApp

#### Scenario: Default template applied to new store
- **WHEN** a new store is created via registration
- **THEN** `messageTemplate` is seeded with the default Portuguese template

### Requirement: Store open/closed toggle
The store owner SHALL be able to toggle the store between open and closed states from the settings page.

#### Scenario: Store owner closes their store
- **WHEN** store owner sets `isOpen: false` and saves
- **THEN** the storefront shows a "loja fechada" message instead of the product grid

#### Scenario: Store owner reopens their store
- **WHEN** store owner sets `isOpen: true` and saves
- **THEN** the storefront renders the product grid normally

### Requirement: Admin password change
The store owner SHALL be able to change their admin password from the settings page.

#### Scenario: Successful password change
- **WHEN** store owner provides correct current password and a new password (min 6 chars)
- **THEN** system updates the password and shows a success message

#### Scenario: Wrong current password rejected
- **WHEN** store owner provides an incorrect current password
- **THEN** system returns an error: "Senha atual incorreta" and does not update the password
