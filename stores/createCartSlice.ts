import { Cart, CartModalTypes, CartProduct } from "@/types/Cart";
import { StateCreator } from "zustand";
import { ProductsSlice } from "./createProductsSlice";
import { CatalogProduct, Variation } from "@/types/Product";
import { CalculateOrderDTO } from "@/types/Order";
import { convertCartToOrder } from "@/utils/convertCartToOrder";

export interface CartSlice {
  cart: Cart;

  addItemToCart: (product: CatalogProduct, variation: Variation) => void;
  increaseItemInCart: (variationId: string) => void;
  decreaseItemInCart: (variationId: string) => void;

  updateItemInCart: (item: CartProduct) => void;
  setCart: (data: Cart) => void;

  cartOpen: boolean;
  toggleCart: () => void;

  cartModal: CartModalTypes;
  toggleCartModal: (value: CartModalTypes) => void;

  _activeVartiationId: string;
  setActiveVariationId: (id: string) => void;
  getActiveProduct: () => CartProduct | undefined;

  getOrderDTO: () => CalculateOrderDTO;
}

const createCartSlice: StateCreator<
  CartSlice & ProductsSlice,
  [],
  [],
  CartSlice
> = (set, get) => ({
  cart: {},

  addItemToCart: (product, variation) => {
    set((state) => ({
      cart: {
        ...state.cart,
        [variation.variationId]: {
          ...variation,
          productId: product.catalogObjectId,
          name: product.name,
          imageUrl: product.imageUrl,
          taxes: product.taxIds,
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

  cartOpen: false,
  toggleCart: () => set((state) => ({ cartOpen: !state.cartOpen })),

  cartModal: "",
  toggleCartModal: (value) => {
    set((state) => ({ cartModal: state.cartModal === value ? "" : value }));
  },

  _activeVartiationId: "",
  setActiveVariationId: (id) => set(() => ({ _activeVartiationId: id })),
  getActiveProduct: () => get().cart[get()._activeVartiationId],

  getOrderDTO: () => convertCartToOrder(get().cart),
});

export default createCartSlice;
