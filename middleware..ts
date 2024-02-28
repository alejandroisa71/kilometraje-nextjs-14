// import { config } from './middleware.';
// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';

// export const { auth: middleware } = NextAuth(authConfig)

// export default NextAuth(authConfig).auth;

// export const config = {
//   // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
//   // matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
//   matcher: '/dashboard/:path*',
// };

import { auth } from './auth';

export default auth((req) => {
  console.log('ROUTE', req.nextUrl.pathname);
});

export const config = {
  matcher: ['/auth/login', '/auth/register',],
};
