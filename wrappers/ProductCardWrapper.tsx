'use client';

import { CartProduct } from '@/types/Cart';
import { CatalogProduct } from '@/types/Product';
import React, { useEffect, useState } from 'react'

type PropTypes = {
  item: CatalogProduct;
  Component: any;
}

export default function ProductCardWrapper({Component, item}: PropTypes) {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (!cart) return;

    const product = JSON.parse(cart).find(
      (p: CartProduct) => p.catalogObjectId === item.catalogObjectId
    );
    if (!product) return;

    setQuantity(product.quantity);
  }, [item.catalogObjectId]);

  const onClickAdd = () => {
    setQuantity((q) => q + 1);
    updateCart({
      ...item,
      variation: item.variations[0],
      quantity: quantity + 1,
    });
  };

  const onClickSubstract = () => {
    setQuantity((q) => q - 1);
    quantity === 1
      ? removeFromCart(item.catalogObjectId)
      : updateCart({
          ...item,
          variation: item.variations[0],
          quantity: quantity - 1,
        });
  };

  const updateCart = (product: CartProduct) => {
    const cart = localStorage.getItem("cart");
    if (!cart) return localStorage.setItem("cart", JSON.stringify([product]));

    localStorage.setItem(
      "cart",
      JSON.stringify([
        ...JSON.parse(cart).filter((p: CartProduct) => p.catalogObjectId !== product.catalogObjectId),
        product,
      ])
    );
  };

  const removeFromCart = (id: string) => {
    const cart = localStorage.getItem("cart");
    if (cart)
      return localStorage.setItem(
        "cart",
        JSON.stringify(JSON.parse(cart).filter((p: CartProduct) => p.catalogObjectId !== id))
      );
  };

  return (
    <Component
      item={item}
      quantity={quantity}
      onClickAdd={onClickAdd}
      onClickSubsctract={onClickSubstract}
    />
  )
}
