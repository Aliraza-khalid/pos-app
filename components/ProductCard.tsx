import { Product } from "@/types/Product";
import { Button, Card, Flex } from "antd";
import React from "react";

type PropTypes = {
  item: Product
}

export default function ProductCard({item}: PropTypes) {
  return (
    <Card title={item.title} size="small" style={{ width: 300 }}>
      <p>{item.description}</p>

      <article style={styles.priceRow}>
        <p>$ {item.price}</p>
        <Flex justify="center" align="center" gap={10}>
          <Button shape="circle" size="small">-</Button>
          <p>1</p>
          <Button shape="circle" size="small">+</Button>
        </Flex>
      </article>

      <Flex justify="center">
        <Button color="primary">Add to cart</Button>
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
