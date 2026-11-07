import {
  createParent,
  deleteParent,
  deleteManyParents,
  fetchAllParents,
  putParent,
} from "@/db";
import { Parent, ParentPayload } from "@/types";
import { create } from "zustand";

type Props = {
  parents: Parent[];
  init: () => Promise<Parent[]>;
  patch: (props: Partial<Parent>, parent: Parent) => Promise<Parent>;
  put: (props: Parent) => Promise<Parent>;
  create: (parent: ParentPayload) => Promise<Parent>;
  delete: (id: string) => Promise<void>;
  deleteMany: (ids: string[]) => Promise<void>;
};

export const useParentStore = create<Props>((set) => ({
  parents: [],
  init: async () => {
    const parents = await fetchAllParents();
    set({ parents });
    return parents;
  },
  create: async (payload) => {
    const parent = await createParent(payload);
    set((prev) => ({ ...prev, parents: [parent, ...prev.parents] }));
    return parent;
  },
  delete: async (id) => {
    await deleteParent(id);
    set((prev) => ({
      ...prev,
      parents: prev.parents.filter((parent) => parent.id !== id),
    }));
  },
  patch: async (payload, parent) => {
    const updatedParent = await putParent({ ...parent, ...payload });
    set((prev) => {
      const parents = [...prev.parents];
      const index = parents.findIndex((item) => item.id === parent.id);
      if (index >= 0) parents[index] = { ...updatedParent };
      return { ...prev, parents };
    });
    return updatedParent;
  },
  put: async (payload) => {
    const updatedParent = await putParent({ ...payload });
    set((prev) => {
      const parents = [...prev.parents];
      const index = parents.findIndex((item) => item.id === payload.id);
      if (index >= 0) parents[index] = { ...updatedParent };
      return { ...prev, parents };
    });
    return updatedParent;
  },
  deleteMany: async (ids) => {
    await deleteManyParents(ids);
    set((prev) => {
      let parents = [...prev.parents];
      ids.map((id) => (parents = parents.filter((parent) => parent.id !== id)));
      return { ...prev, parents };
    });
    return;
  },
}));
