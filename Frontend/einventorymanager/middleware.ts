
import {
  protectedRoutes,
  DEFAULT_HOME_REDIRECT,
  authRoutes,
  publicRoutes,
  organizationRoutes
} from "@/routes";

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import authenticateUser from "./checkAuthentication";

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isAuthenticated = await authenticateUser(request)

    const isPublicRoute = publicRoutes.includes(path);
    const isProtectedRoute = protectedRoutes.some(protectedPath => path.startsWith(protectedPath));
    const isAuthRoute = authRoutes.includes(path);
    const isOrganizationRoute = organizationRoutes.some(orgPath => path.startsWith(orgPath));

    if (isPublicRoute) {
        return null
    }

    if (isProtectedRoute && !isAuthenticated) {
        // Redirect to login page if the validation fails
        return NextResponse.redirect(new URL('/login', request.url));
    }
    
    if (isAuthRoute && isAuthenticated) {
        // Redirect to login page if the validation fails
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (isOrganizationRoute) {
      const organizationId = path.split('/')[2];
      return null;
  }

    return null;
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}