"use client";

import ProductCard from "@/components/ProductCard";
import { Col, Flex, List, Row, Typography } from "antd";
import Search from "antd/es/input/Search";
import Categories from "@/components/Categories";
import { createStyles } from "antd-style";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import SearchProducts from "@/utils/apis/searchProducts";
import { CatalogProduct } from "@/types/Product";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const { styles, cx, theme } = useStyles();
  const {
    data,
    isLoading,
    isError,
    refetch: searchProducts,
  } = useQuery({
    queryKey: ["searchProducts", searchQuery, categoryId],
    queryFn: () => SearchProducts(searchQuery, categoryId),
    enabled: false,
  });

  const onClickSearch = () => {
    searchProducts();
  };

  const onClickCategory = (id: string) => {
    setCategoryId((v) => (v === id ? "" : id));
    setTimeout(() => {
      searchProducts();
    }, 0);
  };

  useEffect(() => {
    searchProducts();
  }, []);

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
          {isLoading && (
            <Typography.Text className={styles.centerText}>
              Loading...
            </Typography.Text>
          )}
          {isError && (
            <Typography.Text className={styles.centerText}>
              No Data Found
            </Typography.Text>
          )}
          {data && (
            <List
              dataSource={data}
              itemLayout="vertical"
              renderItem={(item: CatalogProduct) => (
                <ProductCard key={item.catalogObjectId} item={item} />
              )}
            />
          )}
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
  centerText: {
    textAlign: "center",
  },
}));
