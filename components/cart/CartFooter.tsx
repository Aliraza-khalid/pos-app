import React from "react";
import { Button, Flex } from "antd";
import { createStyles } from "antd-style";
import { EditOutlined } from "@ant-design/icons";
import useCartContext from "@/hooks/context/useCartContext";
import formatPrice from "@/utils/formatPrice";
import Text from "@/components/base/Text";
import CardItem from "../composite/CardItem";
import Loading from "../wrapper/Loading";

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
        <CardItem
          title="Discount"
          titleClass={styles.label}
          icon={<EditOutlined className={styles.editIcon} />}
          right={
            <Loading loading={orderLoading}>
              <Text
                title={`- $ ${formatPrice(totalDiscount)}`}
                className={styles.label}
              />
            </Loading>
          }
        />
      </Button>

      <Button
        type="link"
        block
        className={styles.editButton}
        onClick={() => toggleModal("TotalTax")}
      >
        <CardItem
          title="Tax"
          titleClass={styles.label}
          icon={<EditOutlined className={styles.editIcon} />}
          right={
            <Loading loading={orderLoading}>
              <Text
                title={`$ ${formatPrice(totalTax)}`}
                className={styles.label}
              />
            </Loading>
          }
        />
      </Button>

      <CardItem
        title="Grand Total"
        titleClass={styles.label}
        containerClass={styles.totalRow}
        right={
          <Loading loading={orderLoading}>
            <Text
              title={`$ ${formatPrice(totalAmount)}`}
              className={styles.label}
            />
          </Loading>
        }
      />

      <Flex justify="flex-end">
        <Button
          type="primary"
          size="large"
          disabled={orderLoading}
          className={styles.button}
        >
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
