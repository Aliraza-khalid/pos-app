import React from "react";
import { Button, Flex } from "antd";
import { createStyles } from "antd-style";
import { EditOutlined } from "@ant-design/icons";
import Text from "@/components/base/Text";
import CardItem from "../composite/CardItem";
import Loading from "../wrapper/Loading";
import formatPrice from "@/utils/formatPrice";
import useGenerateOrder from "@/hooks/useGenerateOrder";
import { CartModalTypes } from "@/types/Cart";

type PropTypes = {
  loading: boolean;
  toggleModal: (value: CartModalTypes) => void;
  discount: number;
  tax: number;
  total: number;
};

export default function CartFooter({
  toggleModal,
  loading,
  discount,
  tax,
  total,
}: PropTypes) {
  const { onClick: onClickCheckout, isPending: checkoutLoading } =
    useGenerateOrder();

  const { styles } = useStyles();

  return (
    <>
      <Button
        type="link"
        block
        className={styles.editButton}
        onClick={() => toggleModal(CartModalTypes.totalDiscount)}
      >
        <CardItem
          title="Discount"
          titleClass={styles.label}
          icon={<EditOutlined className={styles.editIcon} />}
          right={
            <Loading loading={loading}>
              <Text
                title={`- $ ${formatPrice(discount)}`}
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
        onClick={() => toggleModal(CartModalTypes.totalTax)}
      >
        <CardItem
          title="Tax"
          titleClass={styles.label}
          icon={<EditOutlined className={styles.editIcon} />}
          right={
            <Loading loading={loading}>
              <Text title={`$ ${formatPrice(tax)}`} className={styles.label} />
            </Loading>
          }
        />
      </Button>

      <CardItem
        title="Grand Total"
        titleClass={styles.label}
        containerClass={styles.totalRow}
        right={
          <Loading loading={loading}>
            <Text title={`$ ${formatPrice(total)}`} className={styles.label} />
          </Loading>
        }
      />

      <Flex justify="flex-end">
        <Button
          type="primary"
          size="large"
          data-test={"checkout-button"}
          disabled={loading}
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
