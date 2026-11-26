import * as jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET! ?? "dexter_is_love";
type TokenPayload = { user_id: string; email: string };
export const issueToken = (
  payload: null | TokenPayload,
  options: jwt.SignOptions = { expiresIn: "12h" },
) => jwt.sign(payload ?? {}, secret, options);

export const verifyToken = (token: string) =>
  jwt.verify(token, secret) as TokenPayload & { iat: number; exp: number };
