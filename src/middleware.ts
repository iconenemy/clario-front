import { NextRequest, NextResponse } from "next/server";

import { auth } from "@utils/auth";
import { ROUTE } from "@utils/routes";

export async function middleware(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.redirect(new URL(ROUTE.SIGN_IN, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
