import searchProducts from "@/utils/apis/searchProducts";
import { useQuery } from "@tanstack/react-query";
import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import ProductsList from "./ProductsList";
import { CatalogProduct } from "@/types/Product";

type ContextTypes = {
  categoryId: string;
  setCategoryId: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  search: () => void;
  data: CatalogProduct[] | undefined;
  isLoading: boolean;
  isError: boolean;
};

export const ProductsContext = createContext<ContextTypes | null>(null);

function Products({ children }: PropsWithChildren) {
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
    <ProductsContext.Provider
      value={{
        categoryId,
        setCategoryId,
        searchQuery,
        setSearchQuery,
        search,
        data,
        isLoading,
        isError
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

Products.List = ProductsList;

export default Products;
