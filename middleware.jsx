import { NextResponse } from "next/server";
import checkAuth from "./app/actions/checkAuth";

export async function middleware(request) {
  const { isAuthenticated } = await checkAuth();

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/Login", request.url));
  }
  return NextResponse.next();
}
//limits
export const config = {
  matcher: ["/Bookings ", "/rooms/add", "/rooms/my"],
};
