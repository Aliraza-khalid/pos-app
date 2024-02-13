"use client";

import { Col, Flex, Row, Space } from "antd";
import { createStyles } from "antd-style";
import PageHeader from "@/components/composite/PageHeader";
import Categories from "@/components/categories";
import SearchBar from "@/components/SearchBar";
import CartDrawer from "@/components/cart/CartDrawer";
import ProductsList from "@/components/products/ProductsList";

export default function ProductsPage() {
  const { styles, theme } = useStyles();

  return (
    <Flex vertical gap={theme.marginXL} className={styles.main}>
      <PageHeader
        title="Products"
        contentSecondFromRight={<SearchBar />}
        contentRightMost={
          <Categories.Modal>
            <Categories.List />
          </Categories.Modal>
        }
      />

      <Row wrap={false}>
        <Col flex="250px" className={styles.categoriesCol}>
          <Categories.Card>
            <Categories.List />
          </Categories.Card>
        </Col>
        <Col flex="auto">
          <Flex vertical>
            <ProductsList />
          </Flex>
        </Col>
      </Row>

      <CartDrawer />
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
    display: none;
    @media screen and (min-width: ${token.screenSM}px) {
      display: block;
    }
  `,
}));
