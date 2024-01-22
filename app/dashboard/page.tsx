"use client";

import { Col, Row } from "antd";
import { createStyles } from "antd-style";
import PageHeader from "@/components/PageHeader";
import Categories from "@/components/Categories";
import Search from "antd/es/input/Search";
import Products from "@/components/Products/Products";
import useProductsContext from "@/context/useProductsContext";

export default function ProductsPage() {
  const { styles } = useStyles();
  const { categoryId, setCategoryId, searchQuery, setSearchQuery, search } =
    useProductsContext();

  const onClickCategory = (id: string) => {
    setCategoryId((v: any) => (v === id ? "" : id));
    setTimeout(() => {
      search();
    }, 0);
  };

  return (
    <main className={styles.main}>
      <PageHeader
        title="Products"
        right1={
          <Search
            value={searchQuery}
            placeholder="Search products"
            className={styles.searchBar}
            onChange={(v) => setSearchQuery(v.target.value)}
            onSearch={() => search()}
            enterButton
          />
        }
        right2={
          <Categories.Modal>
            <Categories.List
              onClickCategory={onClickCategory}
              selectedCategoryId={categoryId}
            />
          </Categories.Modal>
        }
      />

      <Row wrap={false}>
        <Col flex="250px" className={styles.categories}>
          <Categories.Card>
            <Categories.List
              onClickCategory={onClickCategory}
              selectedCategoryId={categoryId}
            />
          </Categories.Card>
        </Col>
        <Col flex="auto" className={styles.listContainer}>
          <Products>
            <Products.List />
          </Products>
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
  searchBar: css`
    width: min(70%, 400px);
  `,
  categories: css`
    display: none;
    @media screen and (min-width: ${token.screenSM}px) {
      display: block;
    }
  `,
  listContainer: {
    display: "flex",
    flexDirection: "column",
  },
}));
