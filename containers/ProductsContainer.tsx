"use client";

import searchProducts from "@/services/searchProducts";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { SearchProductsData } from "@/types/Search";

type ContextTypes = {
  categoryId: string;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  search: () => void;
  searchByCategory: (categoryId: string) => void;
  productPages: SearchProductsData[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isLoadingPage: boolean;
  nextPage: () => void;
};

export const ProductsContext = createContext<ContextTypes | null>(null);

function ProductsContainer({ children }: PropsWithChildren) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["searchProducts", searchQuery, categoryId],
    queryFn: ({ pageParam }) =>
      searchProducts(searchQuery, categoryId, pageParam),
    getNextPageParam: (page) => (page.cursor === "" ? undefined : page.cursor),
    initialPageParam: "",
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, []);

  const searchByCategory = (id: string) => {
    setCategoryId((v) => (v === id ? "" : id));
    setTimeout(() => {
      refetch();
    }, 0);
  };

  const nextPage = () => {
    hasNextPage && !isFetchingNextPage && fetchNextPage();
  };

  return (
    <ProductsContext.Provider
      value={{
        categoryId,
        searchQuery,
        setSearchQuery,
        searchByCategory,
        search: refetch,
        isLoading,
        isError,
        error,
        productPages: data?.pages,
        isLoadingPage: isFetchingNextPage,
        nextPage,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export default ProductsContainer;
