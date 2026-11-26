"server only";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken } from "./utils/use.jwt";

export async function proxy(req: Request) {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  if (accessToken) {
    const decode = verifyToken(accessToken);
    const headers = new Headers(req.headers);

    headers.set("x-user-id", decode.user_id);

    return NextResponse.next({
      request: {
        headers,
      },
    });
  }
  const response = NextResponse.next();
  return response;
}
