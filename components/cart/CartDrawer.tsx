import { Drawer, Flex, Spin } from "antd";
import React, { useEffect, useState } from "react";
import CartFooter from "./CartFooter";
import CartCard from "./CartCard";
import CartModals from "./CartModals";
import useStore from "@/stores";
import useOrderQuery from "@/hooks/query/useOrderQuery";

export default function CartDrawer() {
  const cartOpen = useStore((state) => state.cartOpen);
  const toggleCart = useStore((state) => state.toggleCart);
  const { data, isLoading } = useOrderQuery();
  const [order, setOrder] = useState(data);

  useEffect(() => {
    data && setOrder(data);
  }, [data])

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
          loading={isLoading}
        />
      ))}

      {isLoading && (
        <Flex justify="center">
          <Spin size="large" style={{ marginBottom: 20 }} />
        </Flex>
      )}

      <CartModals />
    </Drawer>
  );
}
