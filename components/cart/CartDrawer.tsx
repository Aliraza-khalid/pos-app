import { Button, Drawer, Flex, Space, Switch, Typography, theme } from "antd";
import React from "react";
import CartFooter from "./CartFooter";
import CartCard from "./CartCard";
import useStore from "@/stores";
import Modal from "@/components/base/Modal";
import formatTax from "@/utils/formatTax";
import useCartContext from "@/hooks/useCartContext";
import useCart from "@/hooks/useCart";
import { CloseOutlined } from "@ant-design/icons";
import { Tax } from "@/types/Tax";
import { CartTax } from "@/types/Cart";
import { filterAppliedTaxes } from "@/utils/filterAppliedTaxes";

const { useToken } = theme;

export default function CartDrawer() {
  const cartItems = useStore((state) => state.cartItems);
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

  const appliedTaxes = filterAppliedTaxes(cartItems);

  return (
    <Drawer
      title="Cart"
      open={cartOpen}
      onClose={toggleCart}
      footer={Object.keys(cartItems).length !== 0 && <CartFooter />}
    >
      {Object.values(cartItems).map((item) => (
        <CartCard key={item.variationId} item={item} />
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
              <Typography.Text>({formatTax(tax)})</Typography.Text>
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
              <Typography.Text>({formatTax(tax)})</Typography.Text>
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
              <Typography.Text>({formatTax(tax)})</Typography.Text>
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
