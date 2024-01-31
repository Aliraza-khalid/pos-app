import { CartContext } from '@/containers/CartContainer';
import React, { useContext } from 'react'

export default function useCartContext() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useProductsContext has to be used within <CartContainer>"
    );
  }

  return context
}
