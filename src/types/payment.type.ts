import { z } from "zod";

export const paymentItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
  targetStudentId: z.string(),
});
export type PaymentItem = z.infer<typeof paymentItemSchema>;

export const paymentInfoSchema = z.object({
  paidAt: z.number(),
  paymentId: z.string(),
});
export type PaymentInfo = z.infer<typeof paymentInfoSchema>;

export const paymentSchema = z.object({
  title: z.string(),
  id: z.string(),
  billingAt: z.number(),
  issuedAt: z.number(),
  updatedAt: z.number(),
  price: z.number(),
  details: z.array(paymentItemSchema),
  info: paymentInfoSchema.nullable(),
  targetStudentIds: z.array(z.string()),
});

export type Payment = z.infer<typeof paymentSchema>;

export const paymentPayloadSchema = paymentSchema.omit({
  id: true,
  issuedAt: true,
  updatedAt: true,
});

export type PaymentPayload = z.infer<typeof paymentPayloadSchema>;
