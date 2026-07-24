import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SECURITY_HOST = "security.mendsourcing.com";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;

  if (host === SECURITY_HOST) {
    if (pathname === "/") {
      const url = request.nextUrl.clone();
      url.pathname = "/federal";
      return NextResponse.rewrite(url);
    }
    return NextResponse.redirect(new URL("/", request.url), 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon|.*\\..*).*)"],
};
