import { CartProduct } from "@/types/Cart";
import { CatalogProduct, Variation } from "@/types/Product";
import React, { useEffect, useRef, useState } from "react";

type PropTypes = {
  item: CatalogProduct;
  variation: Variation;
};

export default function useProductCart({ item, variation }: PropTypes) {
  const [quantity, setQuantity] = useState(0);
  const cartItem = useRef<CartProduct>();

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (!cart) return;

    const product = JSON.parse(cart).find(
      (p: CartProduct) => p.variation.variationId === variation.variationId
    );
    
    setQuantity(product?.quantity ?? 0);
    cartItem.current = product;
  }, [variation.variationId]);

  const onClickAdd = () => {
    setQuantity(q => q + 1);
    updateCart({
      ...item,
      variation,
      quantity: quantity + 1,
    });
  };

  const onClickSubstract = () => {
    setQuantity(q => q - 1);
    quantity === 1
      ? removeFromCart()
      : updateCart({
          ...item,
          variation,
          quantity: quantity - 1,
        });
  };

  const updateCart = (product: CartProduct) => {
    const cart = localStorage.getItem("cart");
    if (!cart) return localStorage.setItem("cart", JSON.stringify([product]));

    localStorage.setItem(
      "cart",
      JSON.stringify([
        ...JSON.parse(cart).filter(
          (p: CartProduct) => p.variation.variationId !== variation.variationId
        ),
        product,
      ])
    );
  };

  const removeFromCart = () => {
    const cart = localStorage.getItem("cart");
    if (!cart) return;

    localStorage.setItem(
      "cart",
      JSON.stringify(
        JSON.parse(cart).filter((p: CartProduct) => p.variation.variationId !== variation.variationId)
      )
    );
  };

  return {
    quantity,
    onClickAdd,
    onClickSubstract,
  };
}
