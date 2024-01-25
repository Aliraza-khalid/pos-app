import useStore from "@/stores";
import { CartProduct } from "@/types/Cart";
import React, { useEffect, useRef, useState } from "react";

export default function useProductQuantity(variationId: string) {
  const cart = useStore(state => state.cart);
  const addItemToCart = useStore(state => state.addItemToCart);
  const increaseItemInCart = useStore(state => state.increaseItemInCart);
  const decreaseItemInCart = useStore(state => state.decreaseItemInCart);

  const [quantity, setQuantity] = useState(0);
  const cartItem = useRef<CartProduct>();

  useEffect(() => {
    const product = cart[variationId];
    setQuantity(product?.quantity ?? 0);
    cartItem.current = product;
  }, [variationId, cart]);

  return {
    quantity,
    addItemToCart,
    increaseItemInCart,
    decreaseItemInCart,
  };
}
