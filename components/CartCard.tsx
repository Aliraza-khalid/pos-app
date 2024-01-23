import { CartProduct } from "@/types/Cart";
import { Button, Card, Flex, Modal, Space, Typography } from "antd";
import { createStyles } from "antd-style";
import React, { useState } from "react";
import formatPrice from "@/utils/formatPrice";
import { EditOutlined } from "@ant-design/icons";
import useProductQuantity from "@/hooks/useProductQuantity";
import { calculateTaxAmount } from "@/utils/calculateTaxAmount";

type PropTypes = {
  item: CartProduct;
};

export default function CartCard({ item }: PropTypes) {
  const { styles } = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const { increaseItemInCart, decreaseItemInCart } = useProductQuantity(
    item.variationId
  );

  const subTotal = item.price.amount * item.quantity;
  const taxAmount = Object.values(item.taxes).reduce(
    (acc, curr) =>
      curr.isApplied ? acc + calculateTaxAmount(curr, subTotal) : acc,
    0
  );

  const onClickTax = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <Card title={item.name} className={styles.card} size="small">
      <Flex justify="space-between" align="center" className={styles.priceRow}>
        <Typography.Text className={styles.price}>
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
        <Typography.Text className={styles.price}>Sub total</Typography.Text>
        <Typography.Text className={styles.price}>
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
        onClick={onClickTax}
      >
        <Flex justify="space-between">
          <Space>
            <Typography.Text className={styles.price}>Tax</Typography.Text>
            <EditOutlined className={styles.editIcon} />
          </Space>
          <Typography.Text className={styles.price}>$ {formatPrice(taxAmount)}</Typography.Text>
        </Flex>
      </Button>

      <Flex justify="space-between" className={styles.totalRow}>
        <Typography.Text className={styles.price}>Total</Typography.Text>
        <Typography.Text>$ {formatPrice(subTotal + taxAmount)}</Typography.Text>
      </Flex>

      <Modal title="Basic Modal" open={openModal} onCancel={closeModal}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
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
  price: css`
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
  `,
  editIcon: css`
    color: ${token.colorTextTertiary};
  `,
  totalRow: css`
    padding-top: ${token.marginXS}px;
    border-top: 1px solid ${token.colorBorderSecondary};
  `,
}));
