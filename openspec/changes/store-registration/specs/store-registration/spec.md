## ADDED Requirements

### Requirement: Store registration form
The system SHALL provide a public form at `/register` where anyone can apply to create a store. Required fields: store name, slug (URL identifier), WhatsApp number, admin password. Optional: description.

#### Scenario: Successful registration
- **WHEN** user submits the form with valid, unique data
- **THEN** system creates a store with `status: pending` and shows a confirmation message stating the store is under review

#### Scenario: Slug already taken
- **WHEN** user submits a slug that already exists in the database
- **THEN** system returns a validation error: "Este endereço já está em uso"

#### Scenario: Invalid slug format
- **WHEN** user submits a slug containing uppercase letters, spaces, or special characters (other than hyphens)
- **THEN** system returns a validation error explaining valid slug format (lowercase, letters, numbers, hyphens, 3–40 chars)

#### Scenario: Missing required fields
- **WHEN** user submits the form with any required field empty
- **THEN** system returns field-level validation errors without creating any store

### Requirement: Store status lifecycle
The system SHALL track store status as one of: `pending`, `active`, `suspended`. New stores created via registration SHALL always start as `pending`.

#### Scenario: Pending store is not publicly accessible
- **WHEN** a visitor navigates to `/{slug}/produtos` and the store has `status: pending`
- **THEN** system returns a 404 response

#### Scenario: Suspended store is not publicly accessible
- **WHEN** a visitor navigates to `/{slug}/produtos` and the store has `status: suspended`
- **THEN** system returns a 404 response

#### Scenario: Active store is publicly accessible
- **WHEN** a visitor navigates to `/{slug}/produtos` and the store has `status: active`
- **THEN** system renders the storefront normally

### Requirement: Admin login blocked for non-active stores
The system SHALL prevent store owners from accessing the admin panel if their store is not `active`.

#### Scenario: Pending store owner tries to log in
- **WHEN** a user submits valid credentials for a store with `status: pending`
- **THEN** system returns a 403 error: "Sua loja ainda não foi aprovada"

#### Scenario: Suspended store owner tries to log in
- **WHEN** a user submits valid credentials for a store with `status: suspended`
- **THEN** system returns a 403 error: "Sua loja foi suspensa"
