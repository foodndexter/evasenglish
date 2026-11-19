import { Juso, lessonSorts } from "@/types";
import { create } from "zustand";

type Props = {
  filter: Filter;
  filterHandler: (target: Filter["target"], value: Filter["value"]) => void;
};

export type Filter = {
  target:
    | "결제일"
    | "클래스"
    | "학교"
    | "학부모"
    | "연락처"
    | "주소"
    | "퇴원일"
    | "부서"
    | null;
  value: number | string | null;
};

const filter: Filter = {
  target: "결제일",
  value: null,
};

export const filters: {
  target: Filter["target"];
  items: { name: string; value: string }[];
}[] = [
  {
    target: "결제일",
    items: [
      { name: "오름차순", value: "ascd" },
      { name: "내림차순", value: "dscd" },
    ],
  },
  {
    target: "부서",
    items: lessonSorts.map((sort) => ({ name: sort, value: sort })),
  },
  { target: "클래스", items: [] },
  { target: "학교", items: [] },
  {
    target: "퇴원일",
    items: [
      { name: "오름차순", value: "ascd" },
      { name: "내림차순", value: "dscd" },
    ],
  },
];

export const useFilterStore = create<Props>((set) => ({
  filter,
  filterHandler: (target, value) => set({ filter: { target, value } }),
}));
