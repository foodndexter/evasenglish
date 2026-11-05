import { School, SchoolPayload } from "@/types";
import { getDB } from "./db";

export const fetchAllSchools = async (
  sort: "createdAt" | "updatedAt" = "createdAt",
) => {
  const db = await getDB();
  return await db.getAllFromIndex(
    "schools",
    sort === "createdAt" ? "by-created-at" : "by-updated-at",
  );
};

export const fetchSchool = async (id: string) => {
  const db = await getDB();
  return await db.get("schools", id);
};

export const putSchool = async (school: School) => {
  const db = await getDB();
  const updatedSchool: School = { ...school, updatedAt: Date.now() };
  await db.put("schools", updatedSchool);
  return updatedSchool;
};

export const deleteSchool = async (id: string) => {
  const db = await getDB();
  await db.delete("schools", id);
};

export const deleteManySchools = async (ids: string[]) => {
  const db = await getDB();
  const tx = db.transaction("schools", "readwrite");
  const store = tx.objectStore("schools");
  await Promise.all(ids.map((id) => store.delete(id)));
  await tx.done;
};

export const createSchool = async (payload: SchoolPayload) => {
  const db = await getDB();
  const createdAt = Date.now();
  const school: School = {
    ...payload,
    id: crypto.randomUUID(),
    createdAt,
    updatedAt: createdAt,
  };
  await db.add("schools", school);
  return school;
};
