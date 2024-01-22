"use client";

import { CatalogProduct, Variation } from "@/types/Product";
import FormatPrice from "@/utils/formatPrice";
import useProductCart from "@/utils/hooks/useProductCart";
import { Button, Card, Flex, Select, Typography } from "antd";
import { createStyles } from "antd-style";
import React, { useState } from "react";

type PropTypes = {
  item: CatalogProduct;
};

export default function ProductCard({ item }: PropTypes) {
  const { styles, cx, theme } = useStyles();
  const [variation, setVariation] = useState<Variation>(item.variations[0]);
  const { quantity, onClickAdd, onClickSubstract } = useProductCart({
    item,
    variation,
  });
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
          $ {FormatPrice(variation.price.amount)}
        </Typography.Text>
        {quantity > 0 && (
          <Flex justify="center" align="center" gap={10}>
            <Button shape="circle" onClick={onClickSubstract} size="small">
              -
            </Button>
            <Typography.Text>{quantity}</Typography.Text>
            <Button shape="circle" onClick={onClickAdd} size="small">
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
        {quantity === 0 && <Button color="primary" onClick={onClickAdd}>
          Add to cart
        </Button>}
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
