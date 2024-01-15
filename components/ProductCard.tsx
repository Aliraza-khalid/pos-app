"use client";

import { CartProduct } from "@/types/Cart";
import { Product } from "@/types/Product";
import { Button, Card, Flex } from "antd";
import React, { useEffect, useState } from "react";

type PropTypes = {
  item: Product;
};

export default function ProductCard({ item }: PropTypes) {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (!cart) return;

    const product = JSON.parse(cart).find((p: CartProduct) => p.id === item.id);
    if (!product) return;

    setQuantity(product.quantity);
  }, [item.id]);

  const onClickAdd = () => {
    setQuantity((q) => q + 1);
    updateCart({
      ...item,
      quantity: quantity + 1,
    });
  };

  const onClickSubstract = () => {
    setQuantity((q) => q - 1);
    quantity === 1
      ? removeFromCart(item.id)
      : updateCart({
          ...item,
          quantity: quantity - 1,
        });
  };

  const updateCart = (product: CartProduct) => {
    const cart = localStorage.getItem("cart");
    if (!cart) return localStorage.setItem("cart", JSON.stringify([product]));

    localStorage.setItem(
      "cart",
      JSON.stringify([
        ...JSON.parse(cart).filter((p: CartProduct) => p.id !== product.id),
        product,
      ])
    );
  };

  const removeFromCart = (id: string) => {
    const cart = localStorage.getItem("cart");
    if (cart)
      return localStorage.setItem(
        "cart",
        JSON.stringify(JSON.parse(cart).filter((p: CartProduct) => p.id !== id))
      );
  };

  return (
    <Card
      title={item.title}
      size="small"
      style={{ width: "100%", marginBottom: 12 }}
    >
      <p>{item.description}</p>

      <article style={styles.priceRow}>
        <p>$ {item.price}</p>
        {quantity > 0 && (
          <Flex justify="center" align="center" gap={10}>
            <Button shape="circle" onClick={onClickSubstract} size="small">
              -
            </Button>
            <p>{quantity}</p>
            <Button shape="circle" onClick={onClickAdd} size="small">
              +
            </Button>
          </Flex>
        )}
      </article>

      <Flex justify="flex-end">
        <Button color="primary" onClick={onClickAdd}>
          Add to cart
        </Button>
      </Flex>
    </Card>
  );
}

const styles = {
  priceRow: {
    marginTop: 10,
    marginBottom: 14,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};
