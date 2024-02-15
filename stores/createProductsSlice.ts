import { StateCreator } from "zustand";

export interface ProductsSlice {
  searchQuery: string;
  categoryId: string;

  setSearchQuery: (value: string) => void;
  updateCategoryId: (value: string) => void;

  categoriesModalOpen: boolean;
  setCategoriesModalOpen: (value: boolean) => void;
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
  updateCategoryId: (value) =>
    set((state) => ({ categoryId: state.categoryId === value ? "" : value })),

  categoriesModalOpen: false,
  setCategoriesModalOpen: (value) =>
    set(() => ({ categoriesModalOpen: value })),
});

export default createProductsSlice;
