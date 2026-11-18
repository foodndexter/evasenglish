import { Memo, Student, StudentEntity, StudentPayload } from "@/types";
import { getDB } from "./db";
import { getSerial } from "@/utils";

export async function fetchAllStudents(
  indexes:
    | "by-created-at"
    | "by-updated-at"
    | "by-lesson"
    | "by-school"
    | "by-parent" = "by-created-at",
) {
  const db = await getDB();
  const students = await db.getAllFromIndex("students", indexes);
  return students;
}

export async function fetchSingleStudent(id: string) {
  const db = await getDB();
  const student = await db.get("students", id);
  return student;
}

export async function createStudent(payloads: StudentPayload[]) {
  const db = await getDB();
  const students: Student[] = [];
  let initialSerial = (await db.get("count", 0)) ?? 0;

  for (const { memos: ms, lessons, schools, parents, ...payload } of payloads) {
    const id = crypto.randomUUID();

    const createdAt = new Date().getTime();
    let memos: Memo[] = [];
    if (ms.length > 0) {
      const items: Memo[] = ms.map((memo) => ({
        ...memo,
        createdAt,
        updatedAt: createdAt,
        id: crypto.randomUUID(),
        studentId: id,
      }));
      const mtx = db.transaction("memos", "readwrite");
      const memoStore = mtx.objectStore("memos");
      await Promise.all(items.map((memo) => memoStore.add(memo)));
      memos = [...items];
    }

    const student: StudentEntity = {
      ...payload,
      memos: memos.map(({ id }) => id),
      lessons: lessons.map(({ id }) => id),
      schools: schools.map(({ id, description }) => ({ id, description })),
      parents: parents.map(({ id }) => id),
      serialNo: getSerial(initialSerial),
      createdAt,
      updatedAt: createdAt,
      id,
      payments: [],
    };

    await db.add("students", student);

    students.push({
      ...student,
      lessons,
      parents,
      schools,
      memos,
      payments: [],
    });
  }
  return students;
}
