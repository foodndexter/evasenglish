import { z } from "zod";
import { schoolSchema } from "./school.types";
import { lessonSchema } from "./lesson.types";
import { parentPayloadSchema, parentSchema } from "./parent.type";
import { paymentSchema } from "./payment.type";
import { memoPayloadSchema, memoSchema } from "./memo.type";
import { jusoSchema } from "./juso.types";

export const studentLevelSchema = z.enum([
  "1학년",
  "2학년",
  "3학년",
  "4학년",
  "5학년",
  "6학년",
]);

export const studentEntitySchema = z.object({
  name: z.string(),
  id: z.string(),
  dob: z.number(),
  createdAt: z.number(),
  updatedAt: z.number(),
  mobile: z.string().length(11),
  lessons: z.array(z.string()),
  schools: z.array(
    z.object(
      schoolSchema.pick({ description: true }).extend({ id: z.string() }),
    ),
  ),
  parents: z.array(z.string()),
  enrolledAt: z.number(),
  dischargedAt: z.number().nullable(),
  payments: z.array(z.string()),
  memos: z.array(z.string()),
  isPinned: z.number().nullable(),
  serialNo: z.string(),
  address: jusoSchema.nullable(),
});

export type StudentEntity = z.infer<typeof studentEntitySchema>;

export const studentSchema = studentEntitySchema
  .omit({
    lessons: true,
    schools: true,
    parents: true,
    payments: true,
    memos: true,
  })
  .extend({
    lessons: z.array(lessonSchema),
    schools: z.array(schoolSchema),
    parents: z.array(parentSchema),
    payments: z.array(paymentSchema),
    memos: z.array(memoSchema),
  });

export type Student = z.infer<typeof studentSchema>;

export const studentPayloadSchema = studentEntitySchema
  .omit({
    lessons: true,
    schools: true,
    parents: true,
    payments: true,
    memos: true,
  })
  .extend({
    lessons: z.array(lessonSchema),
    schools: z.array(schoolSchema),
    parents: z.array(parentSchema.or(parentPayloadSchema)),
    memos: z.array(memoPayloadSchema),
  });

export type StudentPayload = z.infer<typeof studentPayloadSchema>;
