"use client";

import styles from "./page.module.css";
import ProductCard from "../../components/ProductCard";
import { Col, Flex, List, Row } from "antd";
import Search from "antd/es/input/Search";
import Categories from "@/components/Categories";

const data = [
  {
    id: "1",
    title: "product 1",
    description: "decription",
    price: 100,
  },
  {
    id: "2",
    title: "product 2",
    description: "decription",
    price: 200,
  },
  {
    id: "3",
    title: "product 3",
    description: "decription",
    price: 300,
  },
];

export default function Home() {
  const onSearch = (value: string, _e: any, info: any) => {
    console.log(value, _e, info);
  };

  return (
    <main className={styles.main}>
      <article className={styles.titleRow}>
        <h1>Products</h1>
        <Search
          placeholder="Search products"
          style={{ width: 300 }}
          onSearch={onSearch}
          enterButton
        />
      </article>

      <Row wrap={false}>
        <Col flex="250px">
          <Categories />
        </Col>
        <Col flex="auto" className={styles.listContainer}>
          <List
            dataSource={data}
            itemLayout="vertical"
            renderItem={async (item) => (
              <ProductCard key={item.id} item={item} />
            )}
          />
        </Col>
      </Row>
    </main>
  );
}
