import { Cart, CartProduct, CartTax } from "@/types/Cart";
import { StateCreator } from "zustand";
import { ProductsSlice } from "./createProductsSlice";
import { CatalogProduct, Variation } from "@/types/Product";

export interface CartSlice {
  cartItems: Cart;

  addItemToCart: (product: CatalogProduct, variation: Variation) => void;
  increaseItemInCart: (variationId: string) => void;
  decreaseItemInCart: (variationId: string) => void;

  updateItemInCart: (item: CartProduct) => void;

  setCartItems: (data: Cart) => void;
}

const createCartSlice: StateCreator<
  CartSlice & ProductsSlice,
  [],
  [],
  CartSlice
> = (set, get) => ({
  cartItems: {},

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
      cartItems: {
        ...state.cartItems,
        [variation.variationId]: {
          ...variation,
          productId: product.catalogObjectId,
          name: product.name,
          imageUrl: product.imageUrl,
          taxes,
          quantity: 1,
        },
      },
    }));
  },

  increaseItemInCart: (variationId) => {
    const cartItem = get().cartItems[variationId];
    if (!cartItem) return;

    set((state) => ({
      cartItems: {
        ...state.cartItems,
        [variationId]: {
          ...cartItem,
          quantity: cartItem.quantity + 1,
        },
      },
    }));
  },

  decreaseItemInCart: (variationId) => {
    const cart = get().cartItems;

    if (cart[variationId].quantity === 1) {
      const cartCopy = { ...cart };
      delete cartCopy[variationId];
      set(() => ({ cartItems: cartCopy }));
    } else {
      const item = cart[variationId];
      set((state) => ({
        cartItems: {
          ...state.cartItems,
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
      cartItems: {
        ...state.cartItems,
        [item.variationId]: item,
      },
    })),

  setCartItems: (data) => set(() => ({ cartItems: data })),
});

export default createCartSlice;
