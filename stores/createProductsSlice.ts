import { CatalogProduct } from "@/types/Product";
import { Tax } from "@/types/Tax";
import { StateCreator } from "zustand";

export interface ProductsSlice {
  products: CatalogProduct[];
  taxes: Tax[],
}

const createProductsSlice: StateCreator<ProductsSlice, [], [], ProductsSlice> = (set, get) => ({
  products: [],
  taxes: []
});

export default createProductsSlice;
