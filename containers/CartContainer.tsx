"use client";

import React from "react";
import CartDrawer from "@/components/cart/CartDrawer";
import useOrderQuery from "@/hooks/useCalculateOrder";
import useStore from "@/stores";
import CartModalsContainer from "@/containers/CartModalsContainer";
import CartFooter from "@/components/cart/CartFooter";

export default function CartContainer() {
  const open = useStore((state) => state.cartOpen);
  const setCartOpen = useStore((state) => state.setCartOpen);
  const toggleCartModal = useStore((state) => state.toggleCartModal);

  const { data: order, isLoading, isRefetching, error, refetch } = useOrderQuery();

  const totalDiscount = order?.totalDiscountMoney.amount ?? 0;
  const totalTax = order?.totalTaxMoney.amount ?? 0;
  const totalAmount = order?.totalMoney.amount ?? 0;

  return (
    <CartDrawer
      open={open}
      close={() => setCartOpen(false)}
      content={order}
      loading={isLoading || isRefetching}
      error={error}
      retry={refetch}
      footer={
        order?.lineItems?.length && (
          <CartFooter
            toggleModal={toggleCartModal}
            loading={isLoading}
            discount={totalDiscount}
            tax={totalTax}
            total={totalAmount}
          />
        )
      }
    >
      <CartModalsContainer />
    </CartDrawer>
  );
}
