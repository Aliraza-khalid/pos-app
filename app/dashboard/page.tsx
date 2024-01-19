"use client";

import { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { createStyles } from "antd-style";
import { useQuery } from "@tanstack/react-query";
import ProductsList from "@/components/ProductsList";
import searchProducts from "@/utils/apis/searchProducts";
import PageHeader from "@/components/PageHeader";
import Categories from "@/components/Categories";
import Search from "antd/es/input/Search";

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const { styles } = useStyles();
  const {
    data,
    isLoading,
    isError,
    refetch: search,
  } = useQuery({
    queryKey: ["searchProducts", searchQuery, categoryId],
    queryFn: () => searchProducts(searchQuery, categoryId),
    enabled: false,
  });

  useEffect(() => {
    search();
  }, []);

  const onClickSearch = () => {
    search();
  };

  const onClickCategory = (id: string) => {
    setCategoryId((v) => (v === id ? "" : id));
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
            onSearch={onClickSearch}
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
          <ProductsList isLoading={isLoading} isError={isError} data={data} />
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
