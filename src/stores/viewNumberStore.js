import { create } from "zustand";

export const useViewNumberStore = create((set) => ({
  viewingNumber: 0,
  changeStatus: (status) => set((state) => ({ viewingNumber: status })),
  increaseNumber: () =>
    set((state) => ({ viewingNumber: state.viewingNumber + 1 })),
  decreaseNumber: () =>
    set((state) => ({ viewingNumber: state.viewingNumber - 1 })),
}));
