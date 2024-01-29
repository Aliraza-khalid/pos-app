import { Drawer, Select } from "antd";
import React from "react";
import { createStyles } from "antd-style";
import useCartContext from "@/hooks/useCartContext";
import CartFooter from "./CartFooter";
import CartCard from "./CartCard";
import CartModals from "./CartModals";

export default function CartDrawer() {
  const { order, orderLoading } = useCartContext();
  const { cartOpen, toggleCart } = useCartContext();

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

      <CartModals/>
    </Drawer>
  );
}
