"use client";

import { Col, Flex, Row } from "antd";
import { createStyles } from "antd-style";
import PageHeader from "@/components/PageHeader";
import Categories from "@/components/Categories";
import Products from "@/components/Products/Products";
import SearchBar from "@/components/SearchBar";

export default function ProductsPage() {
  const { styles } = useStyles();

  return (
    <main className={styles.main}>
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
            <Products.List />
          </Flex>
        </Col>
      </Row>
    </main>
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
