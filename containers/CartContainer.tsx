import { CartProduct, CartModalTypes } from "@/types/Cart";
import React, { PropsWithChildren, createContext, useState } from "react";

type ContextTypes = {
  cartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  taxModalOpen: boolean;
  discountModalOpen: boolean;
  totalTaxModalOpen: boolean;
  totalDiscountModalOpen: boolean;
  activeItem: CartProduct | undefined;
  setActiveItem: React.Dispatch<React.SetStateAction<CartProduct | undefined>>;
  toggleModal: (modal: CartModalTypes) => void;
};

export const CartContext = createContext<ContextTypes | null>(null);

export default function CartContainer({ children }: PropsWithChildren) {
  const [cartOpen, setCartOpen] = useState(false);
  const [taxModalOpen, setTaxModalOpen] = useState(false);
  const [discountModalOpen, setDiscountModalOpen] = useState(false);
  const [totalTaxModalOpen, setTotalTaxModalOpen] = useState(false);
  const [totalDiscountModalOpen, setTotalDiscountModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<CartProduct>();

  const toggleModal = (modal: CartModalTypes) => {
    switch(modal) {
      case 'ProductTax': 
        setTaxModalOpen(v => !v);
        break;
      case 'TotalTax':
        setTotalTaxModalOpen(v => !v);
        break;
      default:
        break;
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartOpen,
        setCartOpen,
        taxModalOpen,
        discountModalOpen,
        totalTaxModalOpen,
        totalDiscountModalOpen,
        activeItem,
        setActiveItem,
        toggleModal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
