import searchProducts from '@/utils/apis/searchProducts';
import { useQuery } from '@tanstack/react-query';
import React, { createContext, useEffect, useState } from 'react'
import ProductsList from './ProductsList';

export const ProductsContext = createContext<any>({});

function Products(props: any) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const {
    data,
    isLoading,
    isError,
    refetch: search,
  } = useQuery({
    queryKey: ["searchProducts", searchQuery, categoryId],
    queryFn: () => searchProducts(searchQuery, categoryId),
    enabled: false,
  });

  useEffect(() => {
    search();
  }, []);
  
  return (
    <ProductsContext.Provider value={{
      categoryId, 
      setCategoryId,
      searchQuery,
      setSearchQuery,
      search,
      data,
      isLoading, 
      isError
    }}>
      {props.children}
    </ProductsContext.Provider>
  )
}

Products.List = ProductsList;

export default Products;
