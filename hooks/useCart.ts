import React from "react";
import useCartContext from "./useCartContext";
import useStore from "@/stores";
import { Cart } from "@/types/Cart";

export default function useCart() {
  const { activeItem, setActiveItem } = useCartContext();
  const cart = useStore((state) => state.cart);
  const updateItemInCart = useStore((state) => state.updateItemInCart);
  const setCart = useStore((state) => state.setCart);

  const onToggleTax = (id: string, value: boolean) => {
    if (!activeItem) return;
    const updatedData = {
      ...activeItem,
      taxes: activeItem.taxes.map((tax) =>
        tax.id === id
          ? {
              ...tax,
              isApplied: value,
            }
          : tax
      ),
    };

    setActiveItem(id, updatedData);
    updateItemInCart(updatedData);
  };

  const onRemoveTaxFromAll = (id: string) => {
    const updatedCart: Cart = {};

    Object.values(cart).forEach((item) => {
      updatedCart[item.variationId] = {
        ...item,
        taxes: item.taxes.map((tax) =>
          tax.id === id
            ? {
                ...tax,
                isApplied: false,
              }
            : tax
        ),
      };
    });

    setCart(updatedCart);
  };

  return {
    onToggleTax,
    onRemoveTaxFromAll,
  };
}
