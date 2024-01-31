import { Drawer } from "antd";
import React from "react";
import useCartContext from "@/hooks/useCartContext";
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

      <CartModals />
    </Drawer>
  );
}
