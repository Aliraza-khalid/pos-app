import { StateCreator } from "zustand";

export interface ProductsSlice {
  searchQuery: string;
  categoryId: string;

  setSearchQuery: (value: string) => void;
  setCategoryId: (value: string) => void;
}

const createProductsSlice: StateCreator<
  ProductsSlice,
  [],
  [],
  ProductsSlice
> = (set, _) => ({
  searchQuery: "",
  categoryId: "",

  setSearchQuery: (value) => set(() => ({ searchQuery: value })),
  setCategoryId: (value) =>
    set((state) => ({ categoryId: state.categoryId === value ? "" : value })),
});

export default createProductsSlice;
