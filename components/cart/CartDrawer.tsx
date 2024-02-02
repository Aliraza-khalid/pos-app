import { Drawer, Flex, Spin } from "antd";
import React from "react";
import useCartContext from "@/hooks/context/useCartContext";
import CartFooter from "./CartFooter";
import CartCard from "./CartCard";
import CartModals from "./CartModals";
import useStore from "@/stores";

export default function CartDrawer() {
  const { order, orderLoading } = useCartContext();
  const cartOpen = useStore((state) => state.cartOpen);
  const toggleCart = useStore((state) => state.toggleCart);

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

      {orderLoading && (
        <Flex justify="center">
          <Spin size="large" style={{ marginBottom: 20 }} />
        </Flex>
      )}

      <CartModals />
    </Drawer>
  );
}
