import searchProducts from "@/services/searchProducts";
import useStore from "@/stores";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useProductsQuery() {
  const searchQuery = useStore((state) => state.searchQuery);
  const categoryId = useStore((state) => state.categoryId);
  const setSearchQuery = useStore((state) => state.setSearchQuery);
  const updateCategoryId = useStore((state) => state.updateCategoryId);

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
    staleTime: 2 * 60 * 1000,
  });

  const searchByCategory = (id: string) => {
    updateCategoryId(id);
  };

  const searchByQuery = (value: string) => {
    setSearchQuery(value);
  };

  const nextPage = () => {
    hasNextPage && !isFetchingNextPage && fetchNextPage();
  };

  return {
    categoryId,
    searchQuery,
    searchByCategory,
    searchByQuery,
    search: refetch,
    isLoading,
    isError,
    error,
    productPages: data?.pages,
    isLoadingPage: isFetchingNextPage,
    nextPage,
  };
}
