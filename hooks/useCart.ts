import React from "react";
import useCartContext from "./context/useCartContext";
import useStore from "@/stores";
import { Cart } from "@/types/Cart";

export default function useCart() {
  const { modalData, setModalData } = useCartContext();
  const cart = useStore((state) => state.cart);
  const updateItemInCart = useStore((state) => state.updateItemInCart);
  const setCart = useStore((state) => state.setCart);

  const updateDiscounts = (value: string[]) => {
    if (!modalData) return;
    const updatedData = {
      ...modalData,
      discounts: value,
    };

    setModalData(modalData.variationId, updatedData);
    updateItemInCart(updatedData);
  };

  const toggleTax = (value: string, toggle: boolean) => {
    if (!modalData) return;
    const updatedData = {
      ...modalData,
      taxes: toggle
        ? [...modalData.taxes, value]
        : modalData.taxes.filter((t) => t !== value),
    };

    setModalData(updatedData.variationId, updatedData);
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
