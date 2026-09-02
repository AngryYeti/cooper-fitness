import { NextRequest, NextResponse } from "next/server";

const RECIPE_HOSTS = new Set(["recipes.cooper.fitness", "www.recipes.cooper.fitness"]);

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host")?.split(":")[0].toLowerCase();

  if (RECIPE_HOSTS.has(hostname ?? "") && request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/recipes";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
