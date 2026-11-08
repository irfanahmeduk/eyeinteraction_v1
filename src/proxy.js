import { NextResponse } from 'next/server';
import { getSessionUser, SESSION_COOKIE } from './auth/session.js';

// Check every admin request before rendering, including client-side navigations.
// APIs independently enforce authentication in the central dispatcher.
export async function proxy(request) {
  if (request.nextUrl.pathname === '/admin/login') return NextResponse.next();
  try {
    const user = await getSessionUser(request.cookies.get(SESSION_COOKIE)?.value);
    if (!user) return NextResponse.redirect(new URL('/admin/login', request.url));
    return NextResponse.next();
  } catch (error) {
    console.error('Admin session check failed', { name: error.name, code: error.code });
    return new NextResponse('Admin sign-in is temporarily unavailable. Please try again.', {
      status: 503, headers: { 'Cache-Control': 'no-store', 'Content-Type': 'text/plain' },
    });
  }
}

export const config = { matcher: ['/admin/:path*'] };
