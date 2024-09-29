import NextAuth from 'next-auth';
import { NextRequest } from 'next/server';
import { authOptions } from './lib/auth';

const { auth } = NextAuth(authOptions);

export default auth((req: NextRequest) => {
 const { nextUrl } = req;
console.log(req)
 const isAuthenticated = !!req;
 const isPublicRoute = ['/', '/sign', '/signup'].includes(nextUrl.pathname);

 if (isPublicRoute && isAuthenticated)
  return Response.redirect(new URL('/dashboard', nextUrl));

 if (!isAuthenticated && !isPublicRoute)
  return Response.redirect(new URL('/', nextUrl));
});

export const config = {
 matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};