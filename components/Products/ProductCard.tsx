"use client";

import { useState } from "react";
import { Button, Card, Flex, Select } from "antd";
import { createStyles } from "antd-style";
import Text from "@/components/base/Text";
import QuantityControls from "../composite/QuantityControls";
import useStore from "@/stores";
import { CatalogProduct, Variation } from "@/types/Product";
import formatPrice from "@/utils/formatPrice";
import Image from "next/image";
import Title from "../base/Title";
import PlaceholderImage from "@/public/placeholder-image.webp";

type PropTypes = {
  item: CatalogProduct;
};

export default function ProductCard({ item }: PropTypes) {
  const [variation, setVariation] = useState<Variation>(item.variations[0]);
  const [imageError, setImageError] = useState(false);
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
  const imageSrc =
    imageError || !item.imageUrl ? PlaceholderImage : item.imageUrl;

  const onChangeVariation = (id: string) => {
    const selected = item.variations.find((obj) => obj.variationId === id);
    selected && setVariation(selected);
  };

  return (
    <Card
      className={styles.card}
      data-test={`product-card`}
      cover={
        <Image
          alt="product image"
          src={imageSrc}
          width={480}
          height={240}
          style={{
            objectFit: "cover",
          }}
          onError={() => setImageError(true)}
        />
      }
    >
      <Title title={item.name} level={4} />

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
          data-test={"vartiant-selector"}
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
  `,
  price: css`
    font-size: ${token.fontSizeLG}px;
  `,
  priceRow: css`
    margin: ${token.margin}px 0px ${token.marginMD}px;
  `,
}));
