import create from "zustand";

export const useMobileStore = create((set) => ({
  mobileStatus: false,
  changeStatus: (status) => set((state) => ({ mobileStatus: status })),
}));
