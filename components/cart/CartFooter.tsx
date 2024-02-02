import React from "react";
import { Button, Flex } from "antd";
import { createStyles } from "antd-style";
import { EditOutlined } from "@ant-design/icons";
import Text from "@/components/base/Text";
import CardItem from "../composite/CardItem";
import Loading from "../wrapper/Loading";
import useOrderQuery from "@/hooks/query/useOrderQuery";
import useStore from "@/stores";
import formatPrice from "@/utils/formatPrice";
import useOrderMutation from "@/hooks/query/useOrderMutation";
import useNotificationContext from "@/hooks/context/useNotificationContext";

export default function CartFooter() {
  const toggleCart = useStore((state) => state.toggleCart);
  const toggleCartModal = useStore((state) => state.toggleCartModal);
  const getOrderDTO = useStore((state) => state.getOrderDTO);
  const setCart = useStore((state) => state.setCart);

  const { data: order, isLoading: orderLoading } = useOrderQuery();
  const { mutate: generateOrder, isPending: checkoutLoading } =
    useOrderMutation();

  const { showSuccessNotification, showErrorNotification } =
    useNotificationContext();
  const { styles } = useStyles();

  const totalDiscount = order?.totalDiscountMoney.amount ?? 0;
  const totalTax = order?.totalTaxMoney.amount ?? 0;
  const totalAmount = order?.totalMoney.amount ?? 0;

  const onClickCheckout = () => {
    generateOrder(getOrderDTO(), { onSuccess, onError });
  };

  const onSuccess = () => {
    setCart({});
    toggleCart();
    showSuccessNotification({
      description: "Order Generated",
    });
  };

  const onError = (error: Error) => {
    showErrorNotification({
      description: error.message,
    });
  };

  return (
    <>
      <Button
        type="link"
        block
        className={styles.editButton}
        onClick={() => toggleCartModal("TotalDiscount")}
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
        onClick={() => toggleCartModal("TotalTax")}
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
