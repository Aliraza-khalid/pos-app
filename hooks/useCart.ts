import React from "react";
import useCartContext from "./context/useCartContext";
import useStore from "@/stores";
import { Cart } from "@/types/Cart";

export default function useCart() {
  const { modalData, setModalData } = useCartContext();
  const cart = useStore((state) => state.cart);
  const updateItemInCart = useStore((state) => state.updateItemInCart);
  const setCart = useStore((state) => state.setCart);

  const updateTaxes = (value: string[]) => {
    if (!modalData) return;
    const updatedData = {
      ...modalData,
      taxes: value,
    };

    setModalData(updatedData.variationId, updatedData);
    updateItemInCart(updatedData);
  };

  const updateDiscounts = (value: string[]) => {
    if (!modalData) return;
    const updatedData = {
      ...modalData,
      discounts: value,
    };

    setModalData(modalData.variationId, updatedData);
    updateItemInCart(updatedData);
  };

  const updateGlobalTaxes = (value: string[]) => {
    const updatedCart: Cart = {};

    Object.values(cart).forEach((item) => {
      updatedCart[item.variationId] = {
        ...item,
        taxes: value,
      };
    });

    setCart(updatedCart);
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

  return {
    updateTaxes,
    updateDiscounts,
    updateGlobalTaxes,
    updateGlobalDiscounts,
  };
}
