## Context

Currently, stores can only be created by manually inserting rows into the SQLite database. There is no public-facing sign-up flow. The `Store` model has no `status` field, so every store in the DB is implicitly "active."

The app is multi-tenant: each store lives at `/{slug}`. The platform owner (Yuri) approves stores before they go live. This is an approval-based SaaS with future payment gating.

## Goals / Non-Goals

**Goals:**
- Anyone can submit a store registration request via a public form
- Submitted stores are created with `status: pending` and are not publicly accessible
- Existing storefronts gate on `status === active`

**Non-Goals:**
- Email confirmation or email notifications (not in scope now)
- Payment collection at registration time
- Store owner can edit their store before approval

## Decisions

### 1. `status` as a string field with enum-like values (`pending | active | suspended`)
Prisma SQLite doesn't support native enums — using a string with enforced values at the application layer. Simpler than a migration to Postgres for now.

### 2. Registration creates the store immediately (no separate "application" table)
Alternative: a separate `StoreApplication` table that converts to a `Store` on approval. Rejected — adds complexity with no real benefit at this stage. A `pending` store IS the application.

### 3. Slug validation at registration time
The slug becomes the store's permanent URL. It must be unique, lowercase, alphanumeric with dashes, 3–40 chars. Validated on the API before insert.

### 4. Admin login blocked for pending/suspended stores
A store owner who registered but hasn't been approved should not access the admin panel. The login route checks `store.status === active` and returns 403 otherwise.

### 5. Landing page is a simple server component
No dynamic data needed on `/`. Static marketing copy + link to `/register`. No auth required.

## Risks / Trade-offs

- **Slug squatting** → No mitigation at this stage. Approval-based model means Yuri reviews before activating. Edge case is low risk.
- **Plain text password** → Existing system stores passwords in plain text. Registration will follow the same pattern for now to stay consistent. Technical debt to be addressed separately.
- **No email flow** → Store owners have no confirmation after registration. They'll need to be contacted manually. Acceptable for a small-scale launch.

## Migration Plan

1. Add `status String @default("active")` to `Store` in schema (non-breaking — existing stores get `active` by default)
2. Run `prisma migrate dev`
3. Deploy new routes and pages
4. No rollback complexity — the status field defaults to `active`, so existing stores are unaffected
