import dynamic from "next/dynamic";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Flex } from "antd";
import PageHeader from "@/components/composite/PageHeader";
import SearchBar from "@/components/SearchBar";
import ProductsContainer from "@/containers/ProductsContainer";
import getQueryClient from "@/utils/getQueryClient";
import searchProducts from "@/services/searchProducts";
import getCategories from "@/services/getCategories";

const CategoriesModalButton = dynamic(
  () => import("@/components/categories/CategoriesModalButton"),
  { ssr: false }
);
const CartContainer = dynamic(() => import("@/containers/CartContainer"), {
  ssr: false,
});

export default async function ProductsPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["searchProducts", "", ""],
    queryFn: ({ pageParam }) => searchProducts("", "", pageParam),
    initialPageParam: "",
  });
  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: Infinity,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <Flex vertical gap={34} style={{ width: "100%" }}>
      <PageHeader
        title="Products"
        contentSecondFromRight={<SearchBar />}
        contentRightMost={<CategoriesModalButton />}
      />

      <HydrationBoundary state={dehydratedState}>
        <ProductsContainer />
      </HydrationBoundary>

      <CartContainer />
    </Flex>
  );
}
