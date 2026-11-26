import { loginSelectQuery, userDB } from "@/utils/supabase";

export async function GET(req: Request) {
  const user_id = req.headers?.get("x-user-id");

  if (!user_id)
    return Response.json({ message: "Not logged in" }, { status: 401 });

  const { data, error } = await userDB.select(loginSelectQuery).maybeSingle();

  if (error) return Response.json({ message: error.message }, { status: 501 });
  if (!data) return Response.json({ message: "No such user" }, { status: 402 });

  return Response.json({ user: data });
}
