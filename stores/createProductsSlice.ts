import { Tax } from "@/types/Tax";
import { StateCreator } from "zustand";

export interface ProductsSlice {
  taxes: Tax[],

  setTaxes: (data: Tax[]) => void;
}

const createProductsSlice: StateCreator<ProductsSlice, [], [], ProductsSlice> = (set, get) => ({
  taxes: [],

  setTaxes: (data) => set(() => ({taxes: data}))
});

export default createProductsSlice;
