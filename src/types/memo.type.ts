import { z } from "zod";

export const memoSchema = z.object({
  title: z.string().nullable(),
  description: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
  isImportant: z.number().nullable(),
  id: z.string(),
});

export type Memo = z.infer<typeof memoSchema>;

export const memoPayloadSchema = memoSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type MemoPayload = z.infer<typeof memoPayloadSchema>;
