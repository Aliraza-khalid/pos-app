import useCartContext from "@/hooks/useCartContext";
import useStore from "@/stores";
import calculateProductTax from "@/utils/calculateProductTax";
import formatPrice from "@/utils/formatPrice";
import { EditOutlined } from "@ant-design/icons";
import { Button, Flex, Space, Typography } from "antd";
import { createStyles } from "antd-style";
import React from "react";

export default function CartFooter() {
  const cartItems = useStore((state) => state.cartItems);
  const { toggleModal } = useCartContext();
  const { styles } = useStyles();

  const amounts = Object.values(cartItems).reduce(
    (acc, curr) => ({
      tax: acc.tax + calculateProductTax(curr),
      woTax: acc.woTax + curr.price.amount * curr.quantity,
    }),
    {
      tax: 0,
      woTax: 0,
    }
  );

  return (
    <>
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
            $ {formatPrice(amounts.tax)}
          </Typography.Text>
        </Flex>
      </Button>

      <Flex justify="space-between" className={styles.totalRow}>
        <Typography.Text className={styles.label}>Grand Total</Typography.Text>
        <Typography.Text className={styles.label}>
          $ {formatPrice(amounts.tax + amounts.woTax)}
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
