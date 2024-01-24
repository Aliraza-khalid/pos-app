import { CartModalTypes, CartProduct } from "@/types/Cart";
import { Button, Card, Flex, Space, Typography } from "antd";
import { createStyles } from "antd-style";
import React from "react";
import formatPrice from "@/utils/formatPrice";
import { EditOutlined } from "@ant-design/icons";
import useProductQuantity from "@/hooks/useProductQuantity";
import calculateProductTax from "@/utils/calculateProductTax";
import useCartContext from "@/hooks/useCartContext";

type PropTypes = {
  item: CartProduct;
};

export default function CartCard({ item }: PropTypes) {
  const { styles } = useStyles();
  const { increaseItemInCart, decreaseItemInCart } = useProductQuantity(
    item.variationId
  );
  const {setActiveItem, toggleModal} = useCartContext();

  const subTotal = item.price.amount * item.quantity;
  const taxAmount = calculateProductTax(item);

  const onClickEdit = (modal: CartModalTypes) => {
    setActiveItem(item);
    toggleModal(modal);
  }

  return (
    <Card title={item.name} className={styles.card} size="small">
      <Flex justify="space-between" align="center" className={styles.priceRow}>
        <Typography.Text className={styles.label}>
          $ {formatPrice(item.price.amount)}
        </Typography.Text>

        <Flex justify="center" align="center" gap={10}>
          <Button
            shape="circle"
            size="small"
            className={styles.quantityButton}
            onClick={() => decreaseItemInCart(item.variationId)}
          >
            -
          </Button>
          <Typography.Text>{item.quantity}</Typography.Text>
          <Button
            shape="circle"
            size="small"
            className={styles.quantityButton}
            onClick={() => increaseItemInCart(item.variationId)}
          >
            +
          </Button>
        </Flex>
      </Flex>

      <Flex justify="space-between">
        <Typography.Text className={styles.label}>Sub total</Typography.Text>
        <Typography.Text className={styles.label}>
          $ {formatPrice(subTotal)}
        </Typography.Text>
      </Flex>

      {/* <Flex justify="space-between">
        <Typography.Text className={styles.price}>Discount</Typography.Text>
        <Typography.Text className={styles.price}>- $ 2</Typography.Text>
      </Flex> */}

      <Button
        type="link"
        block
        className={styles.editButton}
        onClick={() => onClickEdit('ProductTax')}
      >
        <Flex justify="space-between">
          <Space>
            <Typography.Text className={styles.label}>Tax</Typography.Text>
            <EditOutlined className={styles.editIcon} />
          </Space>
          <Typography.Text className={styles.label}>$ {formatPrice(taxAmount)}</Typography.Text>
        </Flex>
      </Button>

      <Flex justify="space-between" className={styles.totalRow}>
        <Typography.Text className={styles.label}>Total</Typography.Text>
        <Typography.Text className={styles.amount}>$ {formatPrice(subTotal + taxAmount)}</Typography.Text>
      </Flex>
    </Card>
  );
}

const useStyles = createStyles(({ token, css }) => ({
  card: css`
    width: 100%;
    margin-bottom: ${token.marginMD}px;
    background-color: ${token.colorBgLayout};
  `,
  title: {
    fontSize: `${token.fontSizeSM}px;`,
  },
  label: css`
    font-size: ${token.fontSizeLG}px;
    color: ${token.colorTextTertiary};
  `,
  priceRow: css`
    margin-bottom: ${token.marginMD}px;
  `,
  quantityButton: css`
    background-color: ${token.colorBgMask};
  `,
  editButton: css`
    padding: ${token.paddingXXS}px 0px;
    font-weight: 400;
  `,
  editIcon: css`
    color: ${token.colorTextTertiary};
  `,
  amount: css`
    font-size: ${token.fontSizeLG}px;
  `,
  totalRow: css`
    padding-top: ${token.marginXS}px;
    border-top: 1px solid ${token.colorBorderSecondary};
  `,
}));
