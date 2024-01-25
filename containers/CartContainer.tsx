import useStore from "@/stores";
import { CartProduct, CartModalTypes } from "@/types/Cart";
import { CreateOrderDTO, OrderResponseDTO } from "@/types/Order";
import calculateOrder from "@/utils/apis/calculateOrder";
import { filterAppliedTaxes } from "@/utils/filterAppliedTaxes";
import { useQuery } from "@tanstack/react-query";
import React, { PropsWithChildren, createContext, useEffect, useMemo, useState } from "react";

type ContextTypes = {
  cartOpen: boolean;
  toggleCart: () => void;
  taxModalOpen: boolean;
  discountModalOpen: boolean;
  totalTaxModalOpen: boolean;
  totalDiscountModalOpen: boolean;
  activeItem: CartProduct | undefined;
  setActiveItem: (id: string, item?: CartProduct) => void;
  toggleModal: (modal: CartModalTypes) => void;
  order: OrderResponseDTO | undefined;
  orderLoading: boolean;
  orderError: boolean;
};

export const CartContext = createContext<ContextTypes | null>(null);

export default function CartContainer({ children }: PropsWithChildren) {
  const cart = useStore((state) => state.cart);

  const [cartOpen, setCartOpen] = useState(false);
  const [taxModalOpen, setTaxModalOpen] = useState(false);
  const [discountModalOpen, setDiscountModalOpen] = useState(false);
  const [totalTaxModalOpen, setTotalTaxModalOpen] = useState(false);
  const [totalDiscountModalOpen, setTotalDiscountModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<CartProduct>();
  const [order, setOrder] = useState<OrderResponseDTO>();

  const orderDTO: CreateOrderDTO = useMemo(() => ({
    lineItems: Object.values(cart).map((item) => ({
      catalogObjectId: item.variationId,
      quantity: item.quantity.toString(),
      itemType: "ITEM",
      appliedTaxes: item.taxes.reduce(
        (acc, curr) => (curr.isApplied ? [...acc, { taxUid: curr.id }] : acc),
        [] as { taxUid: string }[]
      ),
      appliedDiscounts: [],
    })),
    taxes: filterAppliedTaxes(cart).map((tax) => ({
      uid: tax.id,
      catalogObjectId: tax.id,
      scope: "LINE_ITEM",
    })),
    discounts: [],
  }), [cart]);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["calculateOrder", orderDTO],
    queryFn: () => calculateOrder(orderDTO),
  });

  useEffect(() => {
    data && setOrder(data);
  }, [data])

  const toggleCart = () => setCartOpen((v) => !v);

  const toggleModal = (modal: CartModalTypes) => {
    switch (modal) {
      case "ProductTax":
        setTaxModalOpen((v) => !v);
        break;
      case "TotalTax":
        setTotalTaxModalOpen((v) => !v);
        break;
      default:
        break;
    }
  };

  const updateActiveItem = (id: string, item?: CartProduct) => {
    setActiveItem(item ?? cart[id]);
  }

  return (
    <CartContext.Provider
      value={{
        cartOpen,
        toggleCart,
        taxModalOpen,
        discountModalOpen,
        totalTaxModalOpen,
        totalDiscountModalOpen,
        activeItem,
        setActiveItem: updateActiveItem,
        toggleModal,
        order,
        orderLoading: isLoading,
        orderError: isError
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
