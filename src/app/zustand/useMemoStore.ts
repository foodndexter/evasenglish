import {
  createMemo,
  deleteManyMemos,
  deleteMemo,
  fetchAllMemos,
  putMemo,
} from "@/db/memo-db";
import { Memo, MemoPayload } from "@/types";
import { create } from "zustand";

type Props = {
  create: (memo: MemoPayload) => Promise<Memo>;
  put: (memo: Memo) => Promise<Memo>;
  delete: (id: string) => Promise<void>;
  deleteMany: (ids: string[]) => Promise<void>;
  memos: Memo[];
  init: () => Promise<Memo[]>;
};

export const useMemoStore = create<Props>((set) => ({
  init: async () => {
    const memos = await fetchAllMemos();
    set({ memos });
    return memos;
  },
  create: async (payload): Promise<Memo> => {
    try {
      const memo = await createMemo(payload);
      set((prev) => ({ ...prev, memos: [memo, ...prev.memos] }));
      return memo;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      return {} as Memo;
    }
  },
  put: async (payload) => {
    const memo = await putMemo(payload);
    set((prev) => {
      const memos = [...prev.memos];
      const index = memos.findIndex((i) => i.id === memo.id);
      memos[index] = { ...memo };
      return { ...prev, memos };
    });
    return memo;
  },
  delete: async (id) => {
    await deleteMemo(id);
    set((prev) => ({ ...prev, memos: prev.memos.filter((i) => i.id !== id) }));
  },
  deleteMany: async (ids) => {
    await deleteManyMemos(ids);
    ids.map((id) =>
      set((prev) => ({
        ...prev,
        memos: prev.memos.filter((i) => i.id !== id),
      })),
    );
  },
  memos: [],
}));
