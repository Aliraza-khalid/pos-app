import dynamic from "next/dynamic";
import { Flex } from "antd";
import PageHeader from "@/components/composite/PageHeader";
import SearchBar from "@/components/SearchBar";
import ProductsContainer from "@/containers/ProductsContainer";

const CategoriesModalButton = dynamic(
  () => import("@/components/categories/CategoriesModalButton"),
  { ssr: false }
);
const CartContainer = dynamic(() => import("@/containers/CartContainer"), {
  ssr: false,
});

export default function ProductsPage() {
  return (
    <Flex vertical gap={34}>
      <PageHeader
        title="Products"
        contentSecondFromRight={<SearchBar />}
        contentRightMost={<CategoriesModalButton />}
      />

      <ProductsContainer />

      <CartContainer />
    </Flex>
  );
}
