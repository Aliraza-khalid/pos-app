import { Discount } from "@/types/Discount";
import { Tax } from "@/types/Tax";
import { StateCreator } from "zustand";

export interface ProductsSlice {
  taxes: Tax[],
  discounts: Discount[],

  setTaxes: (data: Tax[]) => void;
  setDiscounts: (data: Discount[]) => void;
}

const createProductsSlice: StateCreator<ProductsSlice, [], [], ProductsSlice> = (set, get) => ({
  taxes: [],
  discounts: [],

  setTaxes: (data) => set(() => ({taxes: data})),
  setDiscounts: (data) => set(() => ({discounts: data}))
});

export default createProductsSlice;
