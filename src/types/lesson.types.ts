import { z } from "zod";

export const lessonSortSchema = z.enum([
  "유치부",
  "초등부",
  "중등부",
  "고등부",
  "대학부",
  "성인부",
  "장년부",
  "노인부",
]);

export type LessonSort = z.infer<typeof lessonSortSchema>;

export const lessonSorts: LessonSort[] = [
  "유치부",
  "초등부",
  "중등부",
  "고등부",
  "대학부",
  "성인부",
  "장년부",
  "노인부",
];

export const lessonCountSchema = z.object({
  perWeek: z.number(),
  perLesson: z.number(),
});

export type LessonCount = z.infer<typeof lessonCountSchema>;

export const lessonSchema = z.object({
  name: z.string(),
  id: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
  sort: lessonSortSchema,
  countPerWeek: z.number(),
  lengthPerLesson: z.number(),
  price: z.number(),
  subject: z.string(),
});

export type Lesson = z.infer<typeof lessonSchema>;

export const lessonPayloadSchema = lessonSchema.omit({
  createdAt: true,
  updatedAt: true,
  id: true,
});

export type LessonPayload = z.infer<typeof lessonPayloadSchema>;
