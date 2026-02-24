import { NextResponse, type NextRequest } from "next/server";

export function GET(request: NextRequest) {
  const url = request.nextUrl.clone();
  // After setting the cookie, send the user back to the root so the app
  // can continue. Use a persistent cookie to remember they skipped auth.
  url.pathname = "/";

  const res = NextResponse.redirect(url);
  res.cookies.set("skip_auth", "1", {
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: true,
    sameSite: "lax",
  });

  return res;
}
