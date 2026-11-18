import { createStudent, fetchAllStudents } from "@/db";
import { Student, StudentEntity, StudentPayload } from "@/types";
import { create } from "zustand";

type Props = {
  init: () => Promise<StudentEntity[]>;
  rawStudents: StudentEntity[];
  students: Student[];
  createStudent: (student: StudentPayload[]) => Promise<Student[]>;
};

export const useStudentStore = create<Props>((set) => ({
  init: async () => {
    const rawStudents = await fetchAllStudents();
    set({ rawStudents });
    return rawStudents;
  },
  rawStudents: [],
  students: [],
  createStudent: async (payload) => {
    const students = await createStudent(payload);
    set((prev) => ({
      ...prev,
      students: [...students, ...prev.students],
      rawStudents: [
        ...students.map((student) => ({
          ...student,
          lessons: student.lessons.map(({ id }) => id),
          parents: student.parents.map(({ id }) => id),
          schools: student.schools.map(({ id, description }) => ({
            id,
            description,
          })),
          payments: student.payments.map(({ id }) => id),
          memos: student.memos.map(({ id }) => id),
        })),
        ...prev.rawStudents,
      ],
    }));
    return students;
  },
}));
