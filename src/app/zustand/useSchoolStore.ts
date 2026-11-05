import {
  createSchool,
  deleteManySchools,
  deleteSchool,
  fetchAllSchools,
  putSchool,
} from "@/db";
import { School, SchoolPayload } from "@/types";
import { create } from "zustand";

type Props = {
  schools: School[];
  init: () => Promise<School[]>;
  patch: (props: Partial<School>, school: School) => Promise<School>;
  put: (props: School) => Promise<School>;
  create: (school: SchoolPayload) => Promise<School>;
  delete: (id: string) => Promise<void>;
  deleteMany: (id: string[]) => Promise<void>;
};

export const useSchoolStore = create<Props>((set) => ({
  schools: [],
  init: async () => {
    const schools = await fetchAllSchools();
    set({ schools });
    return schools;
  },
  create: async (payload) => {
    const school = await createSchool(payload);
    set((prev) => ({ ...prev, schools: [school, ...prev.schools] }));
    return school;
  },
  delete: async (id) => {
    await deleteSchool(id);
    set((prev) => ({
      ...prev,
      schools: prev.schools.filter((school) => school.id !== id),
    }));
  },
  patch: async (payload, school) => {
    const updatedSchool = await putSchool({ ...school, ...payload });
    set((prev) => {
      const schools = [...prev.schools];
      const index = schools.findIndex((item) => item.id === school.id);
      if (index >= 0) schools[index] = { ...updatedSchool };
      return { ...prev, schools };
    });
    return updatedSchool;
  },
  put: async (payload) => {
    const updatedSchool = await putSchool({ ...payload });
    set((prev) => {
      const schools = [...prev.schools];
      const index = schools.findIndex((item) => item.id === payload.id);
      if (index >= 0) schools[index] = { ...updatedSchool };
      return { ...prev, schools };
    });
    return updatedSchool;
  },
  deleteMany: async (ids) => {
    await deleteManySchools(ids);
    set((prev) => {
      let schools = [...prev.schools];
      ids.map((id) => (schools = schools.filter((school) => school.id !== id)));
      return { ...prev, schools };
    });
  },
}));
