import { Biz, User } from "@/types";
import { create } from "zustand";

type Props = {
  user: (User & { biz: Biz[] }) | null;
  handler: (user: Props["user"]) => void;
  initialized: boolean;
  init: () => void;
};

const useAuthStore = create<Props>((set) => ({
  user: null,
  handler: (user) => set({ user }),
  initialized: false,
  init: () => set({ initialized: true }),
}));

export default useAuthStore;
