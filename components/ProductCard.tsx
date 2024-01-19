"use client";

import { CatalogProduct } from "@/types/Product";
import FormatPrice from "@/utils/formatPrice";
import useProductCart from "@/utils/hooks/useProductCart";
import { Button, Card, Flex, Typography } from "antd";
import { createStyles } from "antd-style";
import React from "react";

type PropTypes = {
  item: CatalogProduct;
}

export default function ProductCard({ item }: PropTypes) {
  const { styles, cx, theme } = useStyles();
  const {quantity, onClickAdd, onClickSubstract} = useProductCart({item});

  return (
    <Card
      title={item.name}
      className={styles.card}
    >
      <Flex justify="space-between" align="center" className={styles.priceRow}>
        <Typography.Text>$ {FormatPrice(item.variations[0].price.amount)}</Typography.Text>
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

      <Flex justify="flex-end">
        <Button color="primary" onClick={onClickAdd}>
          Add to cart
        </Button>
      </Flex>
    </Card>
  );
}

const useStyles = createStyles(({ token, css }) => ({
  card: css`
    width: 100%;
    margin-bottom: ${token.marginMD}px;
  `,
  priceRow: css`
    margin-bottom: ${token.marginMD}px;
  `,
}));
