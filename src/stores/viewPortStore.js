import create from "zustand";

export const useViewPortStore = create((set) => ({
  viewingStatus: "hide",
  changeStatus: (status) => set((state) => ({ viewingStatus: status })),
}));
