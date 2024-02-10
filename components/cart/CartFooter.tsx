import React from "react";
import { Button, Flex } from "antd";
import { createStyles } from "antd-style";
import { EditOutlined } from "@ant-design/icons";
import Text from "@/components/base/Text";
import CardItem from "../composite/CardItem";
import Loading from "../wrapper/Loading";
import useOrderQuery from "@/hooks/useCalculateOrder";
import useStore from "@/stores";
import formatPrice from "@/utils/formatPrice";
import useGenerateOrder from "@/hooks/useGenerateOrder";
import { CartModalTypes } from "@/types/Cart";

export default function CartFooter() {
  const toggleCartModal = useStore((state) => state.toggleCartModal);

  const { data: calculation, isLoading: orderLoading } = useOrderQuery();
  const { onClick: onClickCheckout, isPending: checkoutLoading } =
    useGenerateOrder();

  const { styles } = useStyles();

  const totalDiscount = calculation?.totalDiscountMoney.amount ?? 0;
  const totalTax = calculation?.totalTaxMoney.amount ?? 0;
  const totalAmount = calculation?.totalMoney.amount ?? 0;

  return (
    <>
      <Button
        type="link"
        block
        className={styles.editButton}
        onClick={() => toggleCartModal(CartModalTypes.totalDiscount)}
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
        onClick={() => toggleCartModal(CartModalTypes.totalTax)}
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
          loading={checkoutLoading}
          onClick={onClickCheckout}
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
