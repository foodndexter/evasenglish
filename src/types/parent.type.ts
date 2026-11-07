import { z } from "zod";

export const parentRelationshipSchema = z.enum([
  "부",
  "모",
  "할머니",
  "할아버지",
  "친척",
  "기타",
]);
export type ParentRelationship = z.infer<typeof parentRelationshipSchema>;
export const parentRelationships: ParentRelationship[] = [
  "부",
  "모",
  "할머니",
  "할아버지",
  "친척",
  "기타",
];

export const parentSchema = z.object({
  name: z.string(),
  id: z.string(),
  updatedAt: z.number(),
  createdAt: z.number(),
  relationship: parentRelationshipSchema.or(z.string()),
  mobile: z.string().length(11),
  studentIds: z.array(z.string()),
});

export type Parent = z.infer<typeof parentSchema>;

export const parentPayloadSchema = parentSchema.omit({
  id: true,
  updatedAt: true,
  createdAt: true,
});

export type ParentPayload = z.infer<typeof parentPayloadSchema>;
