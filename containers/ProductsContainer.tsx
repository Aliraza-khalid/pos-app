import searchProducts from "@/utils/apis/searchProducts";
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
    refetch: search,
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
    search();
  }, []);

  const searchByCategory = (id: string) => {
    setCategoryId((v) => (v === id ? "" : id));
    setTimeout(() => {
      search();
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
        search,
        searchByCategory,
        isLoading,
        isError,
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
