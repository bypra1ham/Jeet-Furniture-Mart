import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin paths EXCEPT /admin/login
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const sessionCookie = request.cookies.get('admin_session')?.value;
    const adminPassphrase = process.env.ADMIN_PASSPHRASE || 'admin123';

    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    if (sessionCookie !== adminPassphrase) {
      // Clear cookie if it's invalid and redirect with error
      const response = NextResponse.redirect(new URL('/admin/login?error=true', request.url));
      response.cookies.delete('admin_session');
      return response;
    }
  }

  return NextResponse.next();
}

// Matching paths starting with /admin
export const config = {
  matcher: ['/admin/:path*'],
};
