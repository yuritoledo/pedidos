## 1. Auth

- [ ] 1.1 Add `PLATFORM_ADMIN_PASSWORD` to `.env.example` and `.env.local`
- [ ] 1.2 Create `POST /api/admin/login/route.ts` — validates password against env var, sets `platform_admin_session` cookie
- [ ] 1.3 Create `POST /api/admin/logout/route.ts` — clears `platform_admin_session` cookie
- [ ] 1.4 Create middleware or layout-level auth check that redirects unauthenticated requests from `/admin/*` to `/admin/login`
- [ ] 1.5 Create `src/app/admin/login/page.tsx` — simple password form

## 2. Dashboard

- [ ] 2.1 Create `src/app/admin/page.tsx` — server component that fetches all stores ordered by status (pending first), groups them and renders the list
- [ ] 2.2 Display per store: name, slug, WhatsApp number, `createdAt`, status badge, action buttons

## 3. Store Actions API

- [ ] 3.1 Create `POST /api/admin/stores/[id]/approve/route.ts` — sets `status: active`, validates store is currently `pending`
- [ ] 3.2 Create `POST /api/admin/stores/[id]/suspend/route.ts` — sets `status: suspended`, validates store is currently `active`
- [ ] 3.3 Create `POST /api/admin/stores/[id]/reactivate/route.ts` — sets `status: active`, validates store is currently `suspended`

## 4. Action Buttons

- [ ] 4.1 Add "Aprovar" button on pending store rows (calls approve endpoint, refreshes page)
- [ ] 4.2 Add "Suspender" button on active store rows (calls suspend endpoint, refreshes page)
- [ ] 4.3 Add "Reativar" button on suspended store rows (calls reactivate endpoint, refreshes page)
