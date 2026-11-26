import { z } from "zod";
import { jusoSchema } from "./juso.types";

export const userSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  dob: z.date().nullable(),
  mobile: z.string().startsWith("010").length(11),
  email: z.email(),
  created_at: z.date(),
  updated_at: z.date(),
  password: z.string().nullable(),
  juso: jusoSchema.nullable(),
});

export type User = z.infer<typeof userSchema>;

export const userPayloaSchema = userSchema.omit({
  created_at: true,
  updated_at: true,
  id: true,
});

export type UserPayload = z.infer<typeof userPayloaSchema>;

export const deviceSortSchema = z.enum(["MOBILE", "TABLET", "PC"]);

export type DeviceSort = z.infer<typeof deviceSortSchema>;

export const deviceSorts: DeviceSort[] = ["MOBILE", "TABLET", "PC"];

export const userTokenSchema = z.object({
  id: z.uuid(),
  device_id: z.uuid(),
  token: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
  expires_at: z.date(),
  device_name: z.string(),
  device_sort: deviceSortSchema,
  user_id: z.ulid(),
});

export type UserToken = z.infer<typeof userTokenSchema>;

export const userTokenPayloadSchema = userTokenSchema.omit({
  created_at: true,
  updated_at: true,
  id: true,
});

export type UserTokenPayload = z.infer<typeof userTokenPayloadSchema>;
