"use client";

import useStore from "@/stores";
import { CatalogProduct, Variation } from "@/types/Product";
import formatPrice from "@/utils/formatPrice";
import { Button, Card, Flex, Select } from "antd";
import { createStyles } from "antd-style";
import React, { useState } from "react";
import Text from "@/components/base/Text";
import QuantityControls from "../composite/QuantityControls";

type PropTypes = {
  item: CatalogProduct;
};

export default function ProductCard({ item }: PropTypes) {
  const [variation, setVariation] = useState<Variation>(item.variations[0]);
  const quantity = useStore(
    (state) => state.cart[variation.variationId]?.quantity ?? 0
  );

  const addItemToCart = useStore((state) => state.addItemToCart);
  const increaseItemInCart = useStore((state) => state.increaseItemInCart);
  const decreaseItemInCart = useStore((state) => state.decreaseItemInCart);
  const { styles } = useStyles();

  const options = item.variations.map((v) => ({
    value: v.variationId,
    label: v.variant,
  }));

  const onChangeVariation = (id: string) => {
    const selected = item.variations.find((obj) => obj.variationId === id);
    selected && setVariation(selected);
  };

  return (
    <Card title={item.name} className={styles.card} data-test={`product-card`}>
      <Flex justify="space-between" align="center" className={styles.priceRow}>
        <Text
          title={`$ ${formatPrice(variation.price.amount)}`}
          className={styles.price}
        />

        <QuantityControls
          show={quantity !== 0}
          quantity={quantity}
          onClickDecrease={() => decreaseItemInCart(variation.variationId)}
          onClickIncrease={() => increaseItemInCart(variation.variationId)}
        />
      </Flex>

      <Flex justify="space-between">
        <Select
          defaultValue={variation?.variationId}
          options={options}
          data-test={'vartiant-selector'}
          style={{ minWidth: 100 }}
          onChange={onChangeVariation}
        />
        {quantity === 0 && (
          <Button
            color="primary"
            data-test={"add-to-cart-btn"}
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
