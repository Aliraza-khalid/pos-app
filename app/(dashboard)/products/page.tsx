"use client";

import dynamic from "next/dynamic";
import { Flex } from "antd";
import { createStyles } from "antd-style";
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
  const { styles, theme } = useStyles();

  return (
    <Flex vertical gap={theme.marginXL} className={styles.main}>
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

const useStyles = createStyles(({ css }) => ({
  main: css`
    width: 100%;
    @media screen and (min-width: 1920px) {
      width: 1280px;
    }
  `,
}));
