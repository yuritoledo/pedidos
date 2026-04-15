## Context

The platform needs a single superadmin that manages the store lifecycle. This admin is the platform owner (Yuri), not store owners. It must be completely separate from the per-store admin system.

The `store-registration` change adds the `status` field. This change builds the UI and API to act on it.

## Goals / Non-Goals

**Goals:**
- Simple, secure dashboard to manage store status
- Approve pending stores, suspend active ones, reactivate suspended ones
- Auth separate from store auth (env var, not DB)

**Non-Goals:**
- Multi-user platform admin (single owner for now)
- Audit log / change history
- Editing store details from the platform admin
- Email notifications on approval

## Decisions

### 1. Auth via `PLATFORM_ADMIN_PASSWORD` environment variable
No DB table needed for a single admin. Password stored in env, session via a separate cookie (`platform_admin_session`). Simpler than a separate `AdminUser` model. Easy to rotate.

### 2. Route tree at `/admin` (not `/[storeSlug]/admin`)
The platform admin is at the root level, completely isolated from store admin routes. No slug in the path. Middleware protects the entire `/admin/*` subtree.

### 3. Status transitions as explicit API actions (not a generic PATCH)
`POST /api/admin/stores/[id]/approve`, `POST /api/admin/stores/[id]/suspend`, `POST /api/admin/stores/[id]/reactivate`. Explicit endpoints are clearer than a generic status update — easier to audit and extend.

### 4. Store list rendered server-side with full page reload on action
No real-time updates needed. Simple server component + form actions or fetch + router.refresh(). Keeps the implementation minimal.

## Risks / Trade-offs

- **Env var password is a secret** → Must not be committed. Needs documentation in `.env.example`.
- **No rate limiting on platform admin login** → Low risk (single user, not public-facing). Out of scope for now.
- **Session cookie is not encrypted** → Same as store admin pattern. Acceptable for now.
