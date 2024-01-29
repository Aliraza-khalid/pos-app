import { CartModalTypes } from "@/types/Cart";
import { Button, Card, Flex, Space, Typography } from "antd";
import { createStyles } from "antd-style";
import React from "react";
import formatPrice from "@/utils/formatPrice";
import { EditOutlined } from "@ant-design/icons";
import useCartContext from "@/hooks/useCartContext";
import { LineItem } from "@/types/Order";
import useStore from "@/stores";

type PropTypes = {
  item: LineItem;
  loading: boolean;
};

export default function CartCard({ item, loading }: PropTypes) {
  const quantity = useStore((state) => state.cart[item.catalogObjectId]?.quantity ?? 0);
  const increaseItemInCart = useStore((state) => state.increaseItemInCart);
  const decreaseItemInCart = useStore((state) => state.decreaseItemInCart);
  const { setModalData, toggleModal } = useCartContext();
  const { styles } = useStyles();

  const grossAmount = item.grossSalesMoney.amount;
  const discountAmount = item.totalDiscountMoney.amount;
  const taxAmount = item.totalTaxMoney.amount;
  const totalAmount = item.totalMoney.amount;

  const onClickEdit = (modal: CartModalTypes) => {
    setModalData(item.catalogObjectId);
    toggleModal(modal);
  };

  return (
    <Card title={`${item.name} - ${item.variationName}`} className={styles.card} size="small">
      <Flex justify="space-between" align="center" className={styles.priceRow}>
        <Typography.Text className={styles.label}>
          $ {formatPrice(item.basePriceMoney.amount)}
        </Typography.Text>

        <Flex justify="center" align="center" gap={10}>
          <Button
            shape="circle"
            size="small"
            className={styles.quantityButton}
            onClick={() => decreaseItemInCart(item.catalogObjectId)}
          >
            -
          </Button>
          <Typography.Text>{quantity}</Typography.Text>
          <Button
            shape="circle"
            size="small"
            className={styles.quantityButton}
            onClick={() => increaseItemInCart(item.catalogObjectId)}
          >
            +
          </Button>
        </Flex>
      </Flex>

      <Flex justify="space-between">
        <Typography.Text className={styles.label}>Sub total</Typography.Text>
        <Typography.Text className={styles.label}>
          $ {formatPrice(grossAmount)}
        </Typography.Text>
      </Flex>

      <Button
        type="link"
        block
        className={styles.editButton}
        onClick={() => onClickEdit("ProductDiscount")}
      >
        <Flex justify="space-between">
          <Space>
            <Typography.Text className={styles.label}>Discount</Typography.Text>
            <EditOutlined className={styles.editIcon} />
          </Space>
          <Typography.Text className={styles.label}>
            $ {formatPrice(discountAmount)}
          </Typography.Text>
        </Flex>
      </Button>

      <Button
        type="link"
        block
        className={styles.editButton}
        onClick={() => onClickEdit("ProductTax")}
      >
        <Flex justify="space-between">
          <Space>
            <Typography.Text className={styles.label}>Tax</Typography.Text>
            <EditOutlined className={styles.editIcon} />
          </Space>
          <Typography.Text className={styles.label}>
            $ {formatPrice(taxAmount)}
          </Typography.Text>
        </Flex>
      </Button>

      <Flex justify="space-between" className={styles.totalRow}>
        <Typography.Text className={styles.label}>Total</Typography.Text>
        <Typography.Text className={styles.amount}>
          $ {formatPrice(totalAmount)}
        </Typography.Text>
      </Flex>
    </Card>
  );
}

const useStyles = createStyles(({ token, css }) => ({
  card: css`
    width: 100%;
    margin-bottom: ${token.marginMD}px;
    background-color: ${token.colorPrimaryBorder};
    border-color: ${token.colorPrimaryBorder};
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
    background-color: ${token.colorFillSecondary};
    border-color: ${token.colorBgContainer};
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
    border-top: 1px solid ${token.colorBorderBg};
  `,
}));
