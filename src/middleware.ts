import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const protectedPaths = ["/dashboard", "/kanagame", "/community"];
  const isPathProtected = protectedPaths?.some((path) =>
    pathname.includes(path)
  );
  const res = NextResponse.next();
  const token = await getToken({ req });
  if (isPathProtected && !token) {
    const url = new URL(`/auth/signin`, req.url);
    return NextResponse.redirect(url);
  } else if (pathname == "/" && token) {
    const url = new URL(`/dashboard`, req.url);
    return NextResponse.redirect(url);
  }
  return res;
}
