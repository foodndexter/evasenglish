"use server";

import { User, UserPayload, UserTokenPayload } from "@/types";
import {
  loginSelectQuery,
  tokenDB,
  userDB,
  userSelectQuery,
} from "@/utils/supabase";
import { issueToken } from "@/utils/use.jwt";
import * as bcrypt from "bcryptjs";
import { cookies, headers } from "next/headers";
import { userAgent } from "next/server";

export async function loginAction(email: string, password: string) {
  const { data, error } = await userDB
    .select(`${loginSelectQuery}, password`)
    .eq("email", email)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("No such user");

  const isPwCorrect = await bcrypt.compareSync(password, data.password);
  if (!isPwCorrect) throw new Error("Wrong Password");
  const cookieStore = await cookies();

  const h = await headers();
  const ua = userAgent({ headers: h });
  const device_name = `${ua.device.vendor}_${ua.device.model}_${ua.ua}`;

  const device_id = cookieStore.get("deviceId")?.value ?? crypto.randomUUID();

  const accessToken = issueToken(
    { user_id: data.id, email: data.email },
    { expiresIn: "7d" },
  );
  const refreshToken = issueToken(
    { user_id: data.id, email: data.email },
    { expiresIn: "28d" },
  );

  const tokenPayload: UserTokenPayload = {
    device_id,
    device_name,
    device_sort: "PC",
    expires_at: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
    token: refreshToken,
    user_id: data.id,
  };

  const token = await tokenDB.upsert(tokenPayload).select("*").single();

  if (token.error) {
    throw new Error(token.error.message);
  }
  cookieStore.set("accessToken", accessToken);
  cookieStore.set("deviceId", device_id);
  const user = { ...data, password: null };
  return { user, accessToken };
}

export async function signupAction(props: UserPayload) {
  let payload = { ...props };
  if (payload.password) {
    const password = await bcrypt.hash(payload.password, 10);
    payload.password = password;
  }

  const cookieStore = await cookies();

  const id = crypto.randomUUID();
  const device_id = cookieStore.get("deviceId")?.value ?? crypto.randomUUID();
  const h = await headers();
  const ua = userAgent({ headers: h });
  const device_name = `${ua.device.vendor}_${ua.device.model}_${ua.ua}`;

  const refreshToken = issueToken(
    { user_id: id, email: payload.email },
    { expiresIn: "28d" },
  );
  const accessToken = issueToken(
    { user_id: id, email: payload.email },
    { expiresIn: "7d" },
  );
  const tokenPayload: UserTokenPayload = {
    device_id,
    device_name,
    device_sort: "PC",
    expires_at: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
    token: refreshToken,
    user_id: id,
  };

  const user = await userDB
    .insert({ ...payload, id })
    .select(userSelectQuery)
    .single();

  if (user.error) {
    throw new Error(user.error.message);
  }

  const token = await tokenDB.insert(tokenPayload).select("*").single();

  if (token.error) {
    await userDB.delete().eq("id", id);
    throw new Error(token.error.message);
  }

  cookieStore.set("accessToken", accessToken);
  cookieStore.set("deviceId", device_id);
  return { user: { ...user.data }, accessToken } as {
    user: User;
    accessToken: string;
  };
}
