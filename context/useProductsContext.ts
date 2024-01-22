import { ProductsContext } from '@/components/Products/Products';
import React, { useContext } from 'react'

export default function useProductsContext() {
  return useContext(ProductsContext);

}
