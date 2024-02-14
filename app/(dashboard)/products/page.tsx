"use client";

import dynamic from "next/dynamic";
import { Col, Flex, Row } from "antd";
import { createStyles } from "antd-style";
import PageHeader from "@/components/composite/PageHeader";
import SearchBar from "@/components/SearchBar";
import ProductsList from "@/components/products/ProductsList";
import CategoriesContainer from "@/containers/CategoriesContainer";

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

      <Row wrap={false}>
        <Col flex="250px" className={styles.categoriesCol}>
          <CategoriesContainer />
        </Col>
        <Col flex="auto">
          <ProductsList />
        </Col>
      </Row>

      <CartContainer />
    </Flex>
  );
}

const useStyles = createStyles(({ token, css }) => ({
  main: css`
    width: 100%;
    @media screen and (min-width: 1920px) {
      width: 1280px;
    }
  `,
  categoriesCol: css`
    display: block;
    @media screen and (max-width: ${token.screenSM}px) {
      display: none;
    }
  `,
}));
