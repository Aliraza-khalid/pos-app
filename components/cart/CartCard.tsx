import React from "react";
import { Button, Card, Flex, Space } from "antd";
import { createStyles } from "antd-style";
import { EditOutlined } from "@ant-design/icons";
import Text from "@/components/base/Text";
import useCartContext from "@/hooks/useCartContext";
import useStore from "@/stores";
import formatPrice from "@/utils/formatPrice";
import { CartModalTypes } from "@/types/Cart";
import { LineItem } from "@/types/Order";
import QuantityControls from "../composite/QuantityControls";
import CardItem from "../composite/CardItem";

type PropTypes = {
  item: LineItem;
  loading: boolean;
};

export default function CartCard({ item, loading }: PropTypes) {
  const quantity = useStore(
    (state) => state.cart[item.catalogObjectId]?.quantity ?? 0
  );
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
    <Card
      title={`${item.name} - ${item.variationName}`}
      className={styles.card}
      size="small"
    >
      <Flex justify="space-between" align="center" className={styles.priceRow}>
        <Text
          className={styles.label}
          title={`$ ${formatPrice(item.basePriceMoney.amount)}`}
        />

        <QuantityControls
          quantity={quantity}
          onClickDecrease={() => decreaseItemInCart(item.catalogObjectId)}
          onClickIncrease={() => increaseItemInCart(item.catalogObjectId)}
          buttonClass={styles.quantityButton}
        />
      </Flex>

      <CardItem
        title="Sub total"
        titleClass={styles.label}
        right={
          <Text
            title={`$ ${formatPrice(grossAmount)}`}
            className={styles.label}
          />
        }
      />

      <Button
        type="link"
        block
        className={styles.editButton}
        onClick={() => onClickEdit("ProductDiscount")}
      >
        <CardItem
          title="Discount"
          titleClass={styles.label}
          icon={<EditOutlined className={styles.editIcon} />}
          right={
            <Text
              title={`- $ ${formatPrice(discountAmount)}`}
              className={styles.label}
            />
          }
        />
      </Button>

      <Button
        type="link"
        block
        className={styles.editButton}
        onClick={() => onClickEdit("ProductTax")}
      >
        <CardItem
          title="Tax"
          titleClass={styles.label}
          icon={<EditOutlined className={styles.editIcon} />}
          right={
            <Text
              title={`$ ${formatPrice(taxAmount)}`}
              className={styles.label}
            />
          }
        />
      </Button>

      <CardItem
        title="Total"
        titleClass={styles.label}
        containerClass={styles.totalRow}
        right={
          <Text
            title={`$ ${formatPrice(totalAmount)}`}
            className={styles.amount}
          />
        }
      />
    </Card>
  );
}

const useStyles = createStyles(({ token, css }) => ({
  card: css`
    width: 100%;
    margin-bottom: ${token.marginMD}px;
    // background-color: ${token.colorFillSecondary};
    border-width: 0px;
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
    background-color: ${token.colorBgContainer};
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
