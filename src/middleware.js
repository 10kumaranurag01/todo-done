import { NextResponse } from "next/server";
import { getToken } from "./lib/server/session";

export const middleware = async (request) => {
  const session = await getToken();

  const path = request.nextUrl.pathname;

  // Prevents unauthenticated users from accessing the dashboard
  if (session.length === 0 && path === "/dashboard") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Redirect authenticated users to the dashboard
  if (session.length !== 0 && path.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // For all other cases, continue with the request
  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
