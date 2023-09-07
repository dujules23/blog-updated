import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // navigate our user
    NextResponse.rewrite(new URL(req.url));
  },
  {
    callbacks: {
      authorized({ token }) {
        return token?.role === "admin";
      },
    },
  }
);
// matcher checks all admin paths, must have star to work
export const config = { matcher: ["/admin/:path*"] };
