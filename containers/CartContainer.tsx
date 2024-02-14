import React, { useEffect, useState } from "react";
import CartDrawer from "@/components/cart/CartDrawer";
import useOrderQuery from "@/hooks/useCalculateOrder";
import useStore from "@/stores";
import CartModalsContainer from "@/containers/CartModalsContainer";
import CartFooter from "@/components/cart/CartFooter";

export default function CartContainer() {
  const open = useStore((state) => state.cartOpen);
  const setCartOpen = useStore((state) => state.setCartOpen);
  const toggleCartModal = useStore((state) => state.toggleCartModal);

  const { data, isLoading, error, refetch } = useOrderQuery();

  const [order, setOrder] = useState(data);

  const totalDiscount = order?.totalDiscountMoney.amount ?? 0;
  const totalTax = order?.totalTaxMoney.amount ?? 0;
  const totalAmount = order?.totalMoney.amount ?? 0;

  useEffect(() => {
    data && setOrder(data);
  }, [data]);

  return (
    <CartDrawer
      open={open}
      close={() => setCartOpen(false)}
      content={order}
      loading={isLoading}
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
