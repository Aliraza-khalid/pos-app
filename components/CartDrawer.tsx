import { Drawer } from "antd";
import React from "react";
import CartFooter from "./CartFooter";
import CartCard from "./CartCard";
import useStore from "@/stores";

type PropTypes = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({ open, onClose }: PropTypes) {
  const cartItems = useStore((state) => state.cartItems);

  return (
    <Drawer title="Cart" open={open} onClose={onClose} footer={<CartFooter />}>
      {Object.values(cartItems).map((item) => (
        <CartCard key={item.variationId} item={item}/>
      ))}
    </Drawer>
  );
}
