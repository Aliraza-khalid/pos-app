import React from "react";
import useStore from "@/stores";
import { Cart } from "@/types/Cart";

export default function useCart() {
  const cart = useStore((state) => state.cart);
  const activeProduct = useStore(state => state.getActiveProduct)();
  const updateItemInCart = useStore((state) => state.updateItemInCart);
  const setCart = useStore((state) => state.setCart);

  const updateDiscounts = (value: string[]) => {
    if (!activeProduct) return;
    const updatedData = {
      ...activeProduct,
      discounts: value,
    };

    updateItemInCart(updatedData);
  };

  const toggleTax = (value: string, toggle: boolean) => {
    if (!activeProduct) return;
    const updatedData = {
      ...activeProduct,
      taxes: toggle
        ? [...activeProduct.taxes, value]
        : activeProduct.taxes.filter((t) => t !== value),
    };

    updateItemInCart(updatedData);
  };

  const updateGlobalDiscounts = (value: string[]) => {
    const updatedCart: Cart = {};

    Object.values(cart).forEach((item) => {
      updatedCart[item.variationId] = {
        ...item,
        discounts: value,
      };
    });

    setCart(updatedCart);
  };

  const toggleGlobalTax = (value: string, toggle: boolean) => {
    const updatedCart: Cart = {};

    Object.values(cart).forEach((item) => {
      updatedCart[item.variationId] = {
        ...item,
        taxes: toggle
          ? [...item.taxes.filter((t) => t !== value), value]
          : item.taxes.filter((t) => t !== value),
      };
    });

    setCart(updatedCart);
  };

  return {
    updateDiscounts,
    toggleTax,
    updateGlobalDiscounts,
    toggleGlobalTax,
  };
}
