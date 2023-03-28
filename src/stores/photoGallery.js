import { create } from "zustand";
import { PhotoArray } from "../assets/PhotoArray";

export const useGalleryStore = create((set) => ({
  gallery: PhotoArray,
  changeGallery: (list) => set((state) => ({ gallery: list })),
}));
