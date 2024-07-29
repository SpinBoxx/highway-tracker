import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "./actions/auth/session/get-session-action";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
	const session = await getSession();

	const path = request.nextUrl.pathname;

	if (!session && !path.startsWith("/se-connecter")) {
		return NextResponse.redirect(new URL("/se-connecter", request.url));
	}

	// return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
