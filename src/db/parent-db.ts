import { Parent, ParentPayload } from "@/types";
import { getDB } from "./db";

export const fetchAllParents = async (
  sort: "createdAt" | "updatedAt" = "createdAt",
) => {
  const db = await getDB();
  return await db.getAllFromIndex(
    "parents",
    sort === "createdAt" ? "by-created-at" : "by-updated-at",
  );
};

export const fetchParent = async (id: string) => {
  const db = await getDB();
  return await db.get("parents", id);
};

export const createParent = async (payload: ParentPayload) => {
  const db = await getDB();
  const createdAt = Date.now();
  const parent: Parent = {
    ...payload,
    id: crypto.randomUUID(),
    createdAt,
    updatedAt: createdAt,
  };
  await db.add("parents", parent);
  return parent;
};

export const putParent = async (parent: Parent) => {
  const db = await getDB();
  const updatedParent: Parent = { ...parent, updatedAt: Date.now() };
  await db.put("parents", updatedParent);
  return updatedParent;
};

export const deleteParent = async (id: string) => {
  const db = await getDB();
  await db.delete("parents", id);
};

export const deleteManyParents = async (ids: string[]) => {
  const db = await getDB();
  const tx = db.transaction("parents", "readwrite");
  const store = tx.objectStore("parents");
  await Promise.all(ids.map((id) => store.delete(id)));
  await tx.done;
};
