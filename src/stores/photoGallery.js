import { create } from "zustand";
import { PhotoArray } from "../assets/PhotoArray";

export const useGalleryStore = create((set) => ({
  gallery: PhotoArray,
  masterList: PhotoArray,
  changeGallery: (list) => set((state) => ({ gallery: list })),
  changeMasterList: (list) => set((state) => ({ masterList: list })),
}));
