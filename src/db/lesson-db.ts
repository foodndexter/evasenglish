import { Lesson, LessonPayload } from "@/types";
import { getDB } from "./db";

export const fetchAllLessons = async (
  sort: "createdAt" | "updatedAt" = "createdAt",
) => {
  const db = await getDB();
  return await db.getAllFromIndex(
    "lessons",
    sort === "createdAt" ? "by-created-at" : "by-updated-at",
  );
};

export const fetchLesson = async (id: string) => {
  const db = await getDB();
  return await db.get("lessons", id);
};

export const createLesson = async (payload: LessonPayload) => {
  const db = await getDB();
  const createdAt = Date.now();
  const lesson: Lesson = {
    ...payload,
    id: crypto.randomUUID(),
    createdAt,
    updatedAt: createdAt,
  };
  await db.add("lessons", lesson);
  return lesson;
};

export const putLesson = async (lesson: Lesson) => {
  const db = await getDB();
  const updatedLesson: Lesson = { ...lesson, updatedAt: Date.now() };
  await db.put("lessons", updatedLesson);
  return updatedLesson;
};
export const deleteLesson = async (id: string) => {
  const db = await getDB();
  await db.delete("lessons", id);
};

export const deleteManyLessons = async (ids: string[]) => {
  const db = await getDB();
  const tx = db.transaction("lessons", "readwrite");
  const store = tx.objectStore("lessons");
  await Promise.all(ids.map((id) => store.delete(id)));
  await tx.done;
};
