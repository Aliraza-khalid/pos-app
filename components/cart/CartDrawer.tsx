import { Button, Drawer, Flex, Space, Switch, Typography, theme } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import React from "react";
import CartFooter from "./CartFooter";
import CartCard from "./CartCard";
import Modal from "@/components/base/Modal";
import useCartContext from "@/hooks/useCartContext";
import useCart from "@/hooks/useCart";
import appliedTaxes from "@/utils/appliedTaxes";
import useStore from "@/stores";
import appliedDiscounts from "@/utils/appliedDiscounts";

const { useToken } = theme;

export default function CartDrawer() {
  const cart = useStore((state) => state.cart);
  const discounts = useStore((state) => state.discounts);
  const { order, orderLoading } = useCartContext();
  const { onToggleTax, onToggleDiscount, onToggleGlobalTax, onToggleGlobalDiscount } = useCart();
  const {
    cartOpen,
    modalData,
    toggleCart,
    taxModalOpen,
    discountModalOpen,
    totalTaxModalOpen,
    totalDiscountModalOpen,
    toggleModal,
  } = useCartContext();

  const { token } = useToken();
  const allAppliedTaxes = appliedTaxes(cart);
  const allAppliedDiscounts = appliedDiscounts(cart);

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
        title={`Taxes - ${modalData?.name}`}
        open={taxModalOpen}
        onClose={() => toggleModal("ProductTax")}
      >
        {modalData?.taxes.map((tax) => (
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
        title={`Discounts - ${modalData?.name}`}
        open={discountModalOpen}
        onClose={() => toggleModal("ProductDiscount")}
      >
        {discounts.map((discount) => (
          <Flex key={discount.id} justify="space-between">
            <Space>
              <Typography.Text>{discount.name}</Typography.Text>
              {/* <Typography.Text>({tax.percentage} %)</Typography.Text> */}
            </Space>
            <Switch
              value={modalData?.discounts.includes(discount.id)}
              onChange={(v) => onToggleDiscount(discount.id, v)}
            />
          </Flex>
        ))}
      </Modal>

      <Modal
        title="All Taxes"
        open={totalTaxModalOpen}
        onClose={() => toggleModal("TotalTax")}
      >
        {allAppliedTaxes.map((tax) => (
          <Flex key={tax.id} justify="space-between">
            <Space>
              <Typography.Text>{tax.name}</Typography.Text>
              <Typography.Text>({tax.percentage} %)</Typography.Text>
            </Space>
            <Switch
              value={true}
              onChange={(v) => onToggleGlobalTax(tax.id, v)}
            />
          </Flex>
        ))}
      </Modal>

      <Modal
        title="All Discounts"
        open={totalDiscountModalOpen}
        onClose={() => toggleModal("TotalDiscount")}
      >
        {discounts.map((discount) => (
          <Flex key={discount.id} justify="space-between">
            <Space>
              <Typography.Text>{discount.name}</Typography.Text>
              {/* <Typography.Text>({tax.percentage} %)</Typography.Text> */}
            </Space>
            <Switch
              value={allAppliedDiscounts.includes(discount.id)}
              onChange={(v) => onToggleGlobalDiscount(discount.id, v)}
            />
          </Flex>
        ))}
      </Modal>
    </Drawer>
  );
}
