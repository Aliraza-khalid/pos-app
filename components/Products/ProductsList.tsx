import { CatalogProduct } from "@/types/Product";
import { List } from "antd";
import React from "react";
import ProductCard from "./ProductCard";
import useProductsContext from "@/hooks/useProductsContext";
import Text from "@/components/base/Text";

export default function ProductsList() {
  const { products, isLoading, isError } = useProductsContext();

  if (isLoading)
    return <Text title="Loading..." style={{ textAlign: "center" }} />;

  if (isError)
    return <Text title="No Data Found" style={{ textAlign: "center" }} />;

  if (products)
    return (
      <List
        dataSource={products}
        itemLayout="vertical"
        renderItem={(item: CatalogProduct) => (
          <ProductCard key={item.catalogObjectId} item={item} />
        )}
      />
    );
}
