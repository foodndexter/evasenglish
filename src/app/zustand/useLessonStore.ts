import {
  createLesson,
  deleteLesson,
  deleteManyLessons,
  fetchAllLessons,
  putLesson,
} from "@/db";
import { Lesson, LessonPayload } from "@/types";
import { create } from "zustand";

type Props = {
  lessons: Lesson[];
  init: () => Promise<Lesson[]>;
  patch: (props: Partial<Lesson>, lesson: Lesson) => Promise<Lesson>;
  put: (props: Lesson) => Promise<Lesson>;
  create: (lesson: LessonPayload) => Promise<Lesson>;
  delete: (id: string) => Promise<void>;
  deleteMany: (ids: string[]) => Promise<void>;
};

export const useLessonStore = create<Props>((set) => ({
  lessons: [],
  init: async () => {
    const lessons = await fetchAllLessons();
    set({ lessons });
    return lessons;
  },
  create: async (payload) => {
    const lesson = await createLesson(payload);
    set((prev) => ({ ...prev, lessons: [lesson, ...prev.lessons] }));
    return lesson;
  },
  delete: async (id) => {
    await deleteLesson(id);
    set((prev) => ({
      ...prev,
      lessons: prev.lessons.filter((lesson) => lesson.id !== id),
    }));
  },
  patch: async (payload, lesson) => {
    const updatedLesson = await putLesson({ ...lesson, ...payload });
    set((prev) => {
      const lessons = [...prev.lessons];
      const index = lessons.findIndex((item) => item.id === lesson.id);
      if (index >= 0) lessons[index] = { ...updatedLesson };
      return { ...prev, lessons };
    });
    return updatedLesson;
  },
  put: async (payload) => {
    const updatedLesson = await putLesson({ ...payload });
    set((prev) => {
      const lessons = [...prev.lessons];
      const index = lessons.findIndex((item) => item.id === payload.id);
      if (index >= 0) lessons[index] = { ...updatedLesson };
      return { ...prev, lessons };
    });
    return updatedLesson;
  },
  deleteMany: async (ids) => {
    await deleteManyLessons(ids);
    set((prev) => {
      let lessons = [...prev.lessons];
      ids.map((id) => (lessons = lessons.filter((lesson) => lesson.id !== id)));
      return { ...prev, lessons };
    });
    return;
  },
}));
