import create from "zustand";

export const useViewNumberStore = create((set) => ({
  viewingNumber: "hide",
  changeStatus: (status) => set((state) => ({ viewingNumber: status })),
}));
