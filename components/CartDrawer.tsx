import { Drawer } from "antd";
import React from "react";
import CartFooter from "./CartFooter";
import CartCard from "./CartCard";

type PropTypes = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({open, onClose}: PropTypes) {
  
  return (
    <Drawer
      title="Cart"
      open={open}
      onClose={onClose}
      footer={<CartFooter/>}
    >
      <CartCard />
      <CartCard />
      <CartCard />
    </Drawer>
  );
}
