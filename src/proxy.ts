import { NextResponse, type NextRequest } from "next/server";
import { matchLocale } from "@/i18n/config";

export function proxy(request: NextRequest) {
  const locale = matchLocale(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = request.nextUrl.pathname === "/" ? `/${locale}` : `/${locale}${request.nextUrl.pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/", "/privacy", "/blog", "/blog/:slug*"],
};
