"use client";

import { CartProduct } from "@/types/Cart";
import { CatalogProduct } from "@/types/Product";
import FormatPrice from "@/utils/formatPrice";
import { Button, Card, Flex } from "antd";
import React, { useEffect, useState } from "react";

type PropTypes = {
  item: CatalogProduct;
};

export default function ProductCard({ item }: PropTypes) {
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
    <Card
      title={item.name}
      size="small"
      style={{ width: "100%", marginBottom: 12 }}
    >
      {/* <p>{item.description}</p> */}

      <article style={styles.priceRow}>
        <p>$ {FormatPrice(item.variations[0].price.amount)}</p>
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
