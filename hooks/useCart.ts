import React from "react";
import useCartContext from "./useCartContext";
import useStore from "@/stores";
import { Cart } from "@/types/Cart";

export default function useCart() {
  const { activeItem, setActiveItem } = useCartContext();
  const cartItems = useStore((state) => state.cartItems);
  const updateItemInCart = useStore((state) => state.updateItemInCart);
  const setCartItems = useStore((state) => state.setCartItems);

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

    setActiveItem(updatedData);
    updateItemInCart(updatedData);
  };

  const onRemoveTaxFromAll = (id: string) => {
    const updatedCart: Cart = {};

    Object.values(cartItems).forEach((item) => {
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

    setCartItems(updatedCart);
  };

  return {
    onToggleTax,
    onRemoveTaxFromAll,
  };
}
