import { cookies } from 'next/headers';

const SESSION_COOKIE = 'admin-session';

export async function getSession(): Promise<string | null> {
  const cookieStore = cookies();
  return (await cookieStore).get(SESSION_COOKIE)?.value ?? null;
}

export async function setSession(storeSlug: string): Promise<void> {
  const cookieStore = cookies();
  (await cookieStore).set(SESSION_COOKIE, storeSlug, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

export async function clearSession(): Promise<void> {
  const cookieStore = cookies();
  (await cookieStore).set(SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
}
