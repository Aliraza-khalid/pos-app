"use client";

import useStore from "@/stores";
import { CatalogProduct, Variation } from "@/types/Product";
import formatPrice from "@/utils/formatPrice";
import { Button, Card, Flex, Select, Typography } from "antd";
import { createStyles } from "antd-style";
import React, { useState } from "react";

type PropTypes = {
  item: CatalogProduct;
};

export default function ProductCard({ item }: PropTypes) {
  const quantity = useStore(state => state.cart[item.catalogObjectId].quantity);
  const addItemToCart = useStore(state => state.addItemToCart);
  const increaseItemInCart = useStore(state => state.increaseItemInCart);
  const decreaseItemInCart = useStore(state => state.decreaseItemInCart);
  const { styles } = useStyles();

  const [variation, setVariation] = useState<Variation>(item.variations[0]);

  const options = item.variations.map((v) => ({
    value: v.variationId,
    label: v.variant,
  }));

  const onChangeVariation = (id: string) => {
    const selected = item.variations.find((obj) => obj.variationId === id);
    selected && setVariation(selected);
  };

  return (
    <Card title={item.name} className={styles.card}>
      <Flex justify="space-between" align="center" className={styles.priceRow}>
        <Typography.Text className={styles.price}>
          $ {formatPrice(variation.price.amount)}
        </Typography.Text>
        {quantity > 0 && (
          <Flex justify="center" align="center" gap={10}>
            <Button
              shape="circle"
              onClick={() => decreaseItemInCart(variation.variationId)}
              size="small"
            >
              -
            </Button>
            <Typography.Text>{quantity}</Typography.Text>
            <Button
              shape="circle"
              onClick={() => increaseItemInCart(variation.variationId)}
              size="small"
            >
              +
            </Button>
          </Flex>
        )}
      </Flex>

      <Flex justify="space-between">
        <Select
          defaultValue={variation?.variationId}
          options={options}
          style={{ minWidth: 100 }}
          onChange={onChangeVariation}
        />
        {quantity === 0 && (
          <Button
            color="primary"
            onClick={() => addItemToCart(item, variation)}
          >
            Add to cart
          </Button>
        )}
      </Flex>
    </Card>
  );
}

const useStyles = createStyles(({ token, css }) => ({
  card: css`
    width: 100%;
    margin-bottom: ${token.marginMD}px;
  `,
  title: {
    fontSize: `${token.fontSizeSM}px;`,
  },
  price: css`
    font-size: ${token.fontSizeLG}px;
  `,
  priceRow: css`
    margin-bottom: ${token.marginMD}px;
  `,
}));
