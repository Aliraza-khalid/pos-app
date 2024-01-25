import { Button, Drawer, Flex, Space, Switch, Typography, theme } from "antd";
import React from "react";
import CartFooter from "./CartFooter";
import CartCard from "./CartCard";
import Modal from "@/components/base/Modal";
import useCartContext from "@/hooks/useCartContext";
import useCart from "@/hooks/useCart";
import { CloseOutlined } from "@ant-design/icons";
import { filterAppliedTaxes } from "@/utils/filterAppliedTaxes";
import useStore from "@/stores";

const { useToken } = theme;

export default function CartDrawer() {
  const cart = useStore((state) => state.cart);
  const { order, orderLoading } = useCartContext();
  const { onToggleTax, onRemoveTaxFromAll } = useCart();
  const {
    cartOpen,
    toggleCart,
    activeItem,
    taxModalOpen,
    discountModalOpen,
    totalTaxModalOpen,
    totalDiscountModalOpen,
    toggleModal,
  } = useCartContext();

  const { token } = useToken();
  const appliedTaxes = filterAppliedTaxes(cart);

  return (
    <Drawer
      title="Cart"
      open={cartOpen}
      onClose={toggleCart}
      footer={order?.lineItems?.length && <CartFooter />}
    >
      {order?.lineItems?.map((item) => (
        <CartCard
          key={item.catalogObjectId}
          item={item}
          loading={orderLoading}
        />
      ))}

      <Modal
        title={`Taxes - ${activeItem?.name}`}
        open={taxModalOpen}
        onClose={() => toggleModal("ProductTax")}
      >
        {activeItem?.taxes.map((tax) => (
          <Flex key={tax.id} justify="space-between">
            <Space>
              <Typography.Text>{tax.name}</Typography.Text>
              <Typography.Text>({tax.percentage} %)</Typography.Text>
            </Space>
            <Switch
              value={tax.isApplied}
              onChange={(v) => onToggleTax(tax.id, v)}
            />
          </Flex>
        ))}
      </Modal>

      <Modal
        title={`Discounts - ${activeItem?.name}`}
        open={discountModalOpen}
        onClose={() => toggleModal("ProductDiscount")}
      >
        {Object.values(activeItem?.taxes ?? []).map((tax) => (
          <Flex key={tax.id} justify="space-between">
            <Space>
              <Typography.Text>{tax.name}</Typography.Text>
              <Typography.Text>({tax.percentage} %)</Typography.Text>
            </Space>
            <Switch
              value={tax.isApplied}
              onChange={(v) => onToggleTax(tax.id, v)}
            />
          </Flex>
        ))}
      </Modal>

      <Modal
        title="All Taxes"
        open={totalTaxModalOpen}
        onClose={() => toggleModal("TotalTax")}
      >
        {appliedTaxes.map((tax) => (
          <Flex key={tax.id} justify="space-between">
            <Space>
              <Typography.Text>{tax.name}</Typography.Text>
              <Typography.Text>({tax.percentage} %)</Typography.Text>
            </Space>
            <Button
              type="text"
              icon={<CloseOutlined style={{ color: `${token.colorError}` }} />}
              onClick={() => onRemoveTaxFromAll(tax.id)}
            />
          </Flex>
        ))}
      </Modal>
    </Drawer>
  );
}
