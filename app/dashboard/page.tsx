"use client";

import { Col, Flex, Row } from "antd";
import { createStyles } from "antd-style";
import PageHeader from "@/components/composite/PageHeader";
import Categories from "@/components/categories";
import SearchBar from "@/components/SearchBar";
import CartDrawer from "@/components/cart/CartDrawer";
import ProductsList from "@/components/products/ProductsList";
import CategoriesContainer from "@/containers/CategoriesContainer";
import ProductsContainer from "@/containers/ProductsContainer";
import CartContainer from "@/containers/CartContainer";
import DashboardContainer from "@/containers/DashboardContainer";

export default function ProductsPage() {
  const { styles } = useStyles();

  return (
    <DashboardContainer>
      <main className={styles.main}>
        <CategoriesContainer>
          <ProductsContainer>
            <PageHeader
              title="Products"
              right1={<SearchBar />}
              right2={
                <Categories.Modal>
                  <Categories.List />
                </Categories.Modal>
              }
            />

            <Row wrap={false}>
              <Col flex="250px" className={styles.categories}>
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
          </ProductsContainer>
        </CategoriesContainer>

        <CartContainer>
          <CartDrawer />
        </CartContainer>
      </main>
    </DashboardContainer>
  );
}

const useStyles = createStyles(({ token, css }) => ({
  main: css`
    width: 100%;
    @media screen and (min-width: 1920px) {
      width: 1280px;
    }
  `,
  categories: css`
    display: none;
    @media screen and (min-width: ${token.screenSM}px) {
      display: block;
    }
  `,
}));
