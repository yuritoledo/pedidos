## ADDED Requirements

### Requirement: Platform admin authentication
The system SHALL protect the platform admin area at `/admin` with a password stored in the `PLATFORM_ADMIN_PASSWORD` environment variable. Authentication SHALL use a separate cookie (`platform_admin_session`) that does not conflict with store admin sessions.

#### Scenario: Correct password grants access
- **WHEN** the platform owner submits the correct password at `/admin/login`
- **THEN** system sets a `platform_admin_session` cookie and redirects to `/admin`

#### Scenario: Wrong password is rejected
- **WHEN** the platform owner submits an incorrect password
- **THEN** system returns an error: "Senha incorreta" and does not set a session

#### Scenario: Unauthenticated access to admin is blocked
- **WHEN** an unauthenticated user navigates to any `/admin/*` route
- **THEN** system redirects to `/admin/login`

#### Scenario: Logout clears session
- **WHEN** the platform owner clicks logout
- **THEN** system clears `platform_admin_session` cookie and redirects to `/admin/login`

### Requirement: Store list dashboard
The platform admin dashboard SHALL display all stores grouped by status: pending, active, suspended. Each store row SHALL show: name, slug, WhatsApp number, registration date, and available actions.

#### Scenario: Dashboard shows pending stores first
- **WHEN** the platform admin views `/admin`
- **THEN** system renders stores grouped by status with pending stores listed first

#### Scenario: Empty state per group
- **WHEN** a status group has no stores
- **THEN** system omits that group or shows an empty state message

### Requirement: Store approval
The platform admin SHALL be able to approve a pending store, transitioning its status from `pending` to `active`.

#### Scenario: Approving a pending store
- **WHEN** platform admin clicks "Aprovar" on a store with `status: pending`
- **THEN** system sets `store.status = active` and the store becomes publicly accessible

#### Scenario: Cannot approve non-pending store
- **WHEN** platform admin attempts to approve a store that is not `pending`
- **THEN** system returns a 400 error

### Requirement: Store suspension
The platform admin SHALL be able to suspend an active store, transitioning its status from `active` to `suspended`.

#### Scenario: Suspending an active store
- **WHEN** platform admin clicks "Suspender" on a store with `status: active`
- **THEN** system sets `store.status = suspended` and the storefront returns 404

### Requirement: Store reactivation
The platform admin SHALL be able to reactivate a suspended store, transitioning its status from `suspended` to `active`.

#### Scenario: Reactivating a suspended store
- **WHEN** platform admin clicks "Reativar" on a store with `status: suspended`
- **THEN** system sets `store.status = active` and the storefront becomes accessible again
