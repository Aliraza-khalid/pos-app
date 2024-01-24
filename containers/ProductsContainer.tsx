import searchProducts from "@/utils/apis/searchProducts";
import { useQuery } from "@tanstack/react-query";
import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { CatalogProduct } from "@/types/Product";

type ContextTypes = {
  categoryId: string;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  search: () => void;
  searchByCategory: (categoryId: string) => void;
  products: CatalogProduct[] | undefined;
  isLoading: boolean;
  isError: boolean;
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
  } = useQuery({
    queryKey: ["searchProducts", searchQuery, categoryId],
    queryFn: () => searchProducts(searchQuery, categoryId),
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
        products: data,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export default ProductsContainer;
