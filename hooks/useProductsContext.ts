import { ProductsContext } from '@/containers/ProductsContainer';
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
