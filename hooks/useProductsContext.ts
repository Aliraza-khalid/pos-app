import { ProductsContext } from '@/components/Products/Products';
import React, { useContext } from 'react'

export default function useProductsContext() {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error(
      "useProductsContext has to be used within <ProductsContext.Provider>"
    );
  }

  return context
}
