## Why

With approval-based registration, someone needs to approve stores before they go live. There's no platform-level admin interface — only per-store admin panels. Without this, the approval flow is stuck.

## What Changes

- New platform admin area at `/admin` protected by an environment-variable password (separate from store passwords)
- Platform admin can view all stores grouped by status
- Platform admin can approve (pending → active) or suspend (active → suspended) any store
- Platform admin can reactivate (suspended → active) a store

## Capabilities

### New Capabilities
- `platform-admin`: Secure dashboard at `/admin` for the platform owner. Lists stores by status. Allows status transitions: approve, suspend, reactivate.

### Modified Capabilities

## Impact

- `src/app/admin/` — new route tree (distinct from `src/app/[storeSlug]/admin/`)
- `src/app/api/admin/` — new API routes for platform admin actions
- `src/app/api/admin/login/route.ts` — login with `PLATFORM_ADMIN_PASSWORD` env var
- `prisma/schema.prisma` — no schema changes (uses `status` field added by `store-registration`)
- `.env` — new `PLATFORM_ADMIN_PASSWORD` variable required
