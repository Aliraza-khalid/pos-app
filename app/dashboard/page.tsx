"use client";

import ProductCard from "../../components/ProductCard";
import { Col, Flex, List, Row } from "antd";
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
      <article className={styles.titleRow}>
        <h1>Products</h1>
        <Search
          value={searchQuery}
          placeholder="Search products"
          style={{ width: 300 }}
          onChange={(v) => setSearchQuery(v.target.value)}
          onSearch={onClickSearch}
          enterButton
        />
      </article>

      <Row wrap={false}>
        <Col flex="250px" className={styles.categories}>
          <Categories
            onClickCategory={onClickCategory}
            selectedCategoryId={categoryId}
          />
        </Col>
        <Col flex="auto" className={styles.listContainer}>
          {isLoading && <p className={styles.centerText}>Loading...</p>}
          {isError && <p className={styles.centerText}>No Data Found</p>}
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
  titleRow: {
    paddingBottom: "30px",
    display: "flex",
    justifyContent: "space-between",
  },
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
