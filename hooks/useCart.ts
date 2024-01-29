import React from "react";
import useCartContext from "./useCartContext";
import useStore from "@/stores";
import { Cart } from "@/types/Cart";

export default function useCart() {
  const { modalData, setModalData } = useCartContext();
  const cart = useStore((state) => state.cart);
  const updateItemInCart = useStore((state) => state.updateItemInCart);
  const setCart = useStore((state) => state.setCart);

  const onToggleTax = (id: string, value: boolean) => {
    if (!modalData) return;
    const updatedData = {
      ...modalData,
      taxes:
        // modalData.taxes.map((tax) =>
        //   tax.id === id
        //     ? {
        //         ...tax,
        //         isApplied: value,
        //       }
        //     : tax
        // ),
        value
          ? [...modalData.taxes, id]
          : modalData.taxes.filter((t) => t !== id),
    };

    setModalData(id, updatedData);
    updateItemInCart(updatedData);
  };

  const onToggleDiscount = (id: string, value: boolean) => {
    if (!modalData) return;
    const updatedData = {
      ...modalData,
      discounts: value
        ? [...modalData.discounts, id]
        : modalData.discounts.filter((d) => d !== id),
    };

    setModalData(id, updatedData);
    updateItemInCart(updatedData);
  };

  const onToggleGlobalTax = (id: string, value: boolean) => {
    const updatedCart: Cart = {};

    Object.values(cart).forEach((item) => {
      updatedCart[item.variationId] = {
        ...item,
        taxes:
        // item.taxes.map((tax) =>
        //   tax.id === id
        //     ? {
        //         ...tax,
        //         isApplied: value,
        //       }
        //     : tax
        // ),
        value
          ? [...item.taxes, id]
          : item.taxes.filter((t) => t !== id),
      };
    });

    setCart(updatedCart);
  };

  const onToggleGlobalDiscount = (id: string, value: boolean) => {
    const updatedCart: Cart = {};

    Object.values(cart).forEach((item) => {
      updatedCart[item.variationId] = {
        ...item,
        discounts: value
          ? [...item.discounts, id]
          : item.discounts.filter((d) => d !== id),
      };
    });

    setCart(updatedCart);
  };

  return {
    onToggleTax,
    onToggleDiscount,
    onToggleGlobalTax,
    onToggleGlobalDiscount,
  };
}
