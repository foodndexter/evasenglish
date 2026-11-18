import { Memo, MemoPayload } from "@/types";
import { getDB } from "./db";

export async function fetchAllMemos(
  index: "by-created-at" | "by-updated-at" | "by-student-id" = "by-created-at",
) {
  const db = await getDB();
  const memos = await db.getAllFromIndex("memos", index);

  return memos;
}

export async function fetchSingleMemo(id: string) {
  const db = await getDB();
  try {
    const memo = await db.get("memos", id);
    return memo;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
}

export const createMemo = async (payload: MemoPayload) => {
  const db = await getDB();
  const createdAt = Date.now();
  const memo: Memo = {
    ...payload,
    createdAt,
    updatedAt: createdAt,
    id: crypto.randomUUID(),
  };
  await db.add("memos", memo);

  return memo;
};
export const putMemo = async (payload: Memo) => {
  const db = await getDB();
  const updatedAt = Date.now();
  const updatedMemo: Memo = { ...payload, updatedAt };
  await db.put("memos", updatedMemo);
  return updatedMemo;
};
export const deleteMemo = async (id: string) => {
  const db = await getDB();
  await db.delete("memos", id);
};
export const deleteManyMemos = async (ids: string[]) => {
  const db = await getDB();
  const tx = db.transaction("memos", "readwrite");
  const store = tx.objectStore("memos");
  await Promise.all(ids.map((id) => store.delete(id)));
  await tx.done;
};
