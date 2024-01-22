import { CartProduct } from "@/types/Cart";
import { Button, Card, Flex, Modal, Space, Typography } from "antd";
import { createStyles } from "antd-style";
import React, { useState } from "react";
import formatPrice from "@/utils/formatPrice";
import { EditOutlined } from "@ant-design/icons";

type PropTypes = {
  item: CartProduct;
};

export default function CartCard() {
  const { styles } = useStyles();
  const [openModal, setOpenModal] = useState(false);

  const onClickTax = () => {
    setOpenModal(true);
  }

  const closeModal = () => {
    setOpenModal(false);
  }

  return (
    <Card title={"Product Name"} className={styles.card} size="small">
      <Flex justify="space-between" align="center" className={styles.priceRow}>
        <Typography.Text className={styles.price}>
          $ {formatPrice(1000)}
        </Typography.Text>

        <Flex justify="center" align="center" gap={10}>
          <Button shape="circle" size="small" className={styles.quantityButton}>
            -
          </Button>
          <Typography.Text>{2}</Typography.Text>
          <Button shape="circle" size="small" className={styles.quantityButton}>
            +
          </Button>
        </Flex>
      </Flex>

      <Flex justify="space-between">
        <Typography.Text className={styles.price}>Sub total</Typography.Text>
        <Typography.Text className={styles.price}>$ 20</Typography.Text>
      </Flex>

      {/* <Flex justify="space-between">
        <Typography.Text className={styles.price}>Discount</Typography.Text>
        <Typography.Text className={styles.price}>- $ 2</Typography.Text>
      </Flex> */}

      <Button type='link' block className={styles.editButton} onClick={onClickTax}>
        <Flex justify="space-between">
          <Space>
            <Typography.Text className={styles.price}>Tax</Typography.Text>
            <EditOutlined className={styles.editIcon} />
          </Space>
          <Typography.Text className={styles.price}>$ 1.5</Typography.Text>
        </Flex>
      </Button>

      <Flex justify="space-between" className={styles.totalRow}>
        <Typography.Text className={styles.price}>Total</Typography.Text>
        <Typography.Text>$ 19.5</Typography.Text>
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
