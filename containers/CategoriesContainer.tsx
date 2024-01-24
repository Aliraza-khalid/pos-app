import { Category } from "@/types/Category";
import getCategories from "@/utils/apis/getCategories";
import { useQuery } from "@tanstack/react-query";
import React, { PropsWithChildren, createContext } from "react";

type ContextType = {
  isLoading: boolean;
  isError: boolean;
  categories: Category[] | undefined;
};

export const CategoriesContext = createContext<ContextType | null>(null);

export default function CategoriesContainer({ children }: PropsWithChildren) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <CategoriesContext.Provider
      value={{
        isLoading,
        isError,
        categories: data,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}
