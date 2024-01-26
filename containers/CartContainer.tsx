import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import useStore from "@/stores";
import { useQuery } from "@tanstack/react-query";
import { CartProduct, CartModalTypes } from "@/types/Cart";
import { CreateOrderDTO, OrderResponseDTO } from "@/types/Order";
import calculateOrder from "@/utils/apis/calculateOrder";
import { convertCartToOrder } from "@/utils/convertCartToOrder";

type ContextTypes = {
  cartOpen: boolean;
  toggleCart: () => void;
  taxModalOpen: boolean;
  discountModalOpen: boolean;
  totalTaxModalOpen: boolean;
  totalDiscountModalOpen: boolean;
  modalData: CartProduct | undefined;
  setModalData: (id: string, item?: CartProduct) => void;
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
  const [modalData, setModalData] = useState<CartProduct>();
  const [order, setOrder] = useState<OrderResponseDTO>();

  const orderDTO: CreateOrderDTO = useMemo(
    () => convertCartToOrder(cart),
    [cart]
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["calculateOrder", orderDTO],
    queryFn: () => calculateOrder(orderDTO),
  });

  useEffect(() => {
    data && setOrder(data);
  }, [data]);

  const toggleCart = () => setCartOpen((v) => !v);

  const toggleModal = (modal: CartModalTypes) => {
    switch (modal) {
      case "ProductTax":
        setTaxModalOpen((v) => !v);
        break;
      case "ProductDiscount":
        setDiscountModalOpen((v) => !v);
        break;
      case "TotalTax":
        setTotalTaxModalOpen((v) => !v);
        break;
      case "TotalDiscount":
        setTotalDiscountModalOpen((v) => !v);
        break;
      default:
        break;
    }
  };

  const updateModalData = (id: string, item?: CartProduct) => {
    setModalData(item ?? cart[id]);
  };

  return (
    <CartContext.Provider
      value={{
        cartOpen,
        toggleCart,
        taxModalOpen,
        discountModalOpen,
        totalTaxModalOpen,
        totalDiscountModalOpen,
        modalData,
        setModalData: updateModalData,
        toggleModal,
        order,
        orderLoading: isLoading,
        orderError: isError,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
