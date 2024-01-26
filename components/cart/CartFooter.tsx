import useCartContext from "@/hooks/useCartContext";
import formatPrice from "@/utils/formatPrice";
import { EditOutlined } from "@ant-design/icons";
import { Button, Flex, Space, Typography } from "antd";
import { createStyles } from "antd-style";
import React from "react";

export default function CartFooter() {
  const { order, orderLoading, toggleModal } = useCartContext();
  const { styles } = useStyles();

  const totalDiscount = order?.totalDiscountMoney.amount ?? 0;
  const totalTax = order?.totalTaxMoney.amount ?? 0;
  const totalAmount = order?.totalMoney.amount ?? 0;

  return (
    <>
      <Button
        type="link"
        block
        className={styles.editButton}
        onClick={() => toggleModal("TotalDiscount")}
      >
        <Flex justify="space-between">
          <Space>
            <Typography.Text className={styles.label}>Discount</Typography.Text>
            <EditOutlined className={styles.editIcon} />
          </Space>
          <Typography.Text className={styles.label}>
            $ {formatPrice(totalDiscount)}
          </Typography.Text>
        </Flex>
      </Button>

      <Button
        type="link"
        block
        className={styles.editButton}
        onClick={() => toggleModal("TotalTax")}
      >
        <Flex justify="space-between">
          <Space>
            <Typography.Text className={styles.label}>Tax</Typography.Text>
            <EditOutlined className={styles.editIcon} />
          </Space>
          <Typography.Text className={styles.label}>
            $ {formatPrice(totalTax)}
          </Typography.Text>
        </Flex>
      </Button>

      <Flex justify="space-between" className={styles.totalRow}>
        <Typography.Text className={styles.label}>Grand Total</Typography.Text>
        <Typography.Text className={styles.label}>
          $ {formatPrice(totalAmount)}
        </Typography.Text>
      </Flex>

      <Flex justify="flex-end">
        <Button type="primary" size="large" className={styles.button}>
          Checkout
        </Button>
      </Flex>
    </>
  );
}

const useStyles = createStyles(({ token, css }) => ({
  label: css`
    font-size: ${token.fontSizeXL}px;
  `,
  editButton: css`
    padding: ${token.paddingXXS}px 0px;
    font-weight: 400;
  `,
  editIcon: css`
    color: ${token.colorTextTertiary};
  `,
  totalRow: css`
    padding-top: ${token.paddingXS}px;
    border-top: 0.5px solid ${token.colorBorderSecondary};
  `,
  button: css`
    width: 40%;
    margin: ${token.marginLG}px 0px;
  `,
}));
