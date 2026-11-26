import { Biz } from "@/types";
import { create } from "zustand";

type Props = {
  biz: null | Biz;
  handler: (biz: Props["biz"]) => void;
};

const useBizStore = create<Props>((set) => ({
  biz: null,
  handler: (biz) => set({ biz }),
}));

export default useBizStore;
