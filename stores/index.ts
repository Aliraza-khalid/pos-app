import { create } from "zustand";
import createCartSlice, { CartSlice } from "./createCartSlice";
import { persist } from "zustand/middleware";
import createProductsSlice, { ProductsSlice } from "./createProductsSlice";

const useStore = create<CartSlice & ProductsSlice>()(
  persist(
    (...a) => ({
      ...createProductsSlice(...a),
      ...createCartSlice(...a),
    }),
    {
      name: "zustant-store",
    }
  )
);

export default useStore;
