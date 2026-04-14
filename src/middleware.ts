import { NextRequest, NextResponse } from 'next/server';

const ADMIN_COOKIE = 'admin-session';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /{slug}/admin routes (not /{slug}/admin/login)
  if (pathname.match(/^\/[^/]+\/admin$/) || pathname.match(/^\/[^/]+\/admin\//)) {
    if (pathname.includes('/admin/login')) {
      return NextResponse.next();
    }

    const session = request.cookies.get(ADMIN_COOKIE);

    if (!session) {
      // Extract store slug for redirect after login
      const match = pathname.match(/^\/([^/]+)\/admin/);
      const storeSlug = match?.[1];
      const loginUrl = storeSlug ? `/${storeSlug}/admin/login` : '/admin/login';
      return NextResponse.redirect(new URL(loginUrl, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
