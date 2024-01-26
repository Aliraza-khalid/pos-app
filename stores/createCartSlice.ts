import { Cart, CartProduct, CartTax } from "@/types/Cart";
import { StateCreator } from "zustand";
import { ProductsSlice } from "./createProductsSlice";
import { CatalogProduct, Variation } from "@/types/Product";

export interface CartSlice {
  cart: Cart;

  addItemToCart: (product: CatalogProduct, variation: Variation) => void;
  increaseItemInCart: (variationId: string) => void;
  decreaseItemInCart: (variationId: string) => void;

  updateItemInCart: (item: CartProduct) => void;

  setCart: (data: Cart) => void;
}

const createCartSlice: StateCreator<
  CartSlice & ProductsSlice,
  [],
  [],
  CartSlice
> = (set, get) => ({
  cart: {},

  addItemToCart: (product, variation) => {
    const allTaxes = get().taxes;
    const taxes = allTaxes.reduce(
      (acc, curr) =>
        product.taxIds.includes(curr.id)
          ? [
              ...acc,
              {
                ...curr,
                isApplied: true,
              },
            ]
          : acc,
      [] as CartTax[]
    );

    set((state) => ({
      cart: {
        ...state.cart,
        [variation.variationId]: {
          ...variation,
          productId: product.catalogObjectId,
          name: product.name,
          imageUrl: product.imageUrl,
          taxes,
          discounts: [],
          quantity: 1,
        },
      },
    }));
  },

  increaseItemInCart: (variationId) => {
    const cartItem = get().cart[variationId];
    if (!cartItem) return;

    set((state) => ({
      cart: {
        ...state.cart,
        [variationId]: {
          ...cartItem,
          quantity: cartItem.quantity + 1,
        },
      },
    }));
  },

  decreaseItemInCart: (variationId) => {
    const cart = get().cart;

    if (cart[variationId].quantity === 1) {
      const cartCopy = { ...cart };
      delete cartCopy[variationId];
      set(() => ({ cart: cartCopy }));
    } else {
      const item = cart[variationId];
      set((state) => ({
        cart: {
          ...state.cart,
          [variationId]: {
            ...item,
            quantity: item.quantity - 1,
          },
        },
      }));
    }
  },

  updateItemInCart: (item) =>
    set((state) => ({
      cart: {
        ...state.cart,
        [item.variationId]: item,
      },
    })),

  setCart: (data) => set(() => ({ cart: data })),
});

export default createCartSlice;
