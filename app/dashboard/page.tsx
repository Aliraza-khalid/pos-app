"use client";

import { useEffect, useState } from "react";
import { Col, Flex, Row, Typography } from "antd";
import Search from "antd/es/input/Search";
import { createStyles } from "antd-style";
import { useQuery } from "@tanstack/react-query";
import Categories from "@/components/Categories";
import ProductsList from "@/components/ProductsList";
import searchProducts from "@/utils/apis/searchProducts";

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const { styles, cx, theme } = useStyles();
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
      <Flex justify="space-between" gap={12} className={styles.topRow}>
        <Typography.Title level={2}>Products</Typography.Title>
        <Search
          value={searchQuery}
          placeholder="Search products"
          className={styles.searchBar}
          onChange={(v) => setSearchQuery(v.target.value)}
          onSearch={onClickSearch}
          enterButton
        />
      </Flex>

      <Row wrap={false}>
        <Col flex="250px" className={styles.categories}>
          <Categories
            onClickCategory={onClickCategory}
            selectedCategoryId={categoryId}
          />
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
  topRow: css`
    margin-bottom: ${token.marginXL}px;
  `,
  searchBar: css`
    width: min(60%, 425px);
  `,
  categories: css`
    display: none;
    @media screen and (min-width: 600px) {
      display: block;
    }
  `,
  listContainer: {
    display: "flex",
    flexDirection: "column",
  },
}));
