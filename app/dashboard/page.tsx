import styles from "./page.module.css";
import ProductCard from "../../components/ProductCard";
import { List } from "antd";

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

export default async function Home() {
  return (
    <main className={styles.main}>
      <article className={styles.title}>
        <h1>Products</h1>
      </article>

      <ProductCard item={data[0]}/>

      {/* <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={async (item) => {
          // "use server";
          return <ProductCard key={item.id} item={item} />;
        }}
      /> */}
    </main>
  );
}
