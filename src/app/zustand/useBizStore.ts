import { Biz } from "@/types";
import { create } from "zustand";

type Props = {
  biz: null | Biz;
  handler: (biz: null | Biz) => void;
  patch: (props: Partial<Biz>) => void;
};

export const useBizStore = create<Props>((set) => ({
  biz: {
    address: "전북특별자치도 완주군 봉동읍 둔산3로 79, 3층 301호",
    createdAt: new Date("2021/11/15").getTime(),
    id: "123",
    regiNo: "6129422897",
    subjects: ["영어"],
    updatedAt: new Date("2026/10/15").getTime(),
    ceo: "안찬선",
    name: "에바즈 영어 전문 학원",
  },
  handler: (biz) => {
    set({ biz });
    console.log("init biz info", biz);
  },
  patch: (props) =>
    set((prev) =>
      prev.biz ? { ...prev, biz: { ...prev.biz, ...props } } : prev,
    ),
}));
