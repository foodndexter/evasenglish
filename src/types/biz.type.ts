import { z } from "zod";

export const bizEntitySchema = z.object({
  id: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
  password: z.string(),
  regiNo: z.string().length(10),
  address: z.string(),
  subjects: z.array(z.string()),
  name: z.string(),
  ceo: z.string(),
});

export type BizEntity = z.infer<typeof bizEntitySchema>;

export const bizSchema = bizEntitySchema.omit({ password: true });

export type Biz = z.infer<typeof bizSchema>;
