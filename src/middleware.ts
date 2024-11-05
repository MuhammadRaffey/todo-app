import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define public routes that don't require authentication
const publicRoutes = ["/authentication"];

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const { pathname } = request.nextUrl;
  console.log("Pathname: ", pathname);

  // Check if the route is public
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Check for auth token
  const token = request.cookies.get("auth-token");
  console.log("Token: ", token);

  // If no token found, redirect to authentication page
  if (!token) {
    const url = new URL("/authentication", request.url);
    // Preserve the original URL to redirect back after login
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configure middleware to run on specific paths
export const config = {
  // Match all routes except static files and api
  matcher: [
    /*
     * Match all request paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_static (inside /public)
     * 4. /favicon.ico, /sitemap.xml (static files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml).*)",
  ],
};
