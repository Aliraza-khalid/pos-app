import { CatalogProduct } from "@/types/Product";
import { List, Typography } from "antd";
import React from "react";
import ProductCard from "./ProductCard";
import useProductsContext from "@/hooks/useProductsContext";

export default function ProductsList() {
  const { products, isLoading, isError } = useProductsContext();

  if (isLoading)
    return (
      <Typography.Text style={{ textAlign: "center" }}>
        Loading...
      </Typography.Text>
    );

  if (isError)
    return (
      <Typography.Text style={{ textAlign: "center" }}>
        No Data Found
      </Typography.Text>
    );

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
