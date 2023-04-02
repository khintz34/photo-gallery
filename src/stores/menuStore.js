import { create } from "zustand";

export const useMenuStore = create((set) => ({
  album: "",
  place: "",
  person: "",
  menu: "show",
  changeAlbum: (name) => set((state) => ({ album: name })),
  changePlace: (name) => set((state) => ({ place: name })),
  changePerson: (name) => set((state) => ({ person: name })),
  changeMenu: (name) => set((state) => ({ menu: name })),
}));
