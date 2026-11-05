import { z } from "zod";

export const schoolSortSchema = z.enum([
  "어린이집",
  "유치원",
  "초등학교",
  "중학교",
  "고등학교",
  "대학교",
  "직장",
  "무직",
]);

export type SchoolSort = z.infer<typeof schoolSortSchema>;

export const schoolSorts: SchoolSort[] = [
  "어린이집",
  "유치원",
  "초등학교",
  "중학교",
  "고등학교",
  "대학교",
  "직장",
  "무직",
];

export const schoolSchema = z.object({
  sort: schoolSortSchema.or(z.string()),
  name: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
  description: z.string().nullable(),
  id: z.string(),
});

export type School = z.infer<typeof schoolSchema>;

export const schoolPayloadSchema = schoolSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type SchoolPayload = z.infer<typeof schoolPayloadSchema>;
