import React, { useEffect } from "react";
import { List, Space, Spin } from "antd";
import { useInView } from "react-intersection-observer";
import ProductCard from "./ProductCard";
import useProductsContext from "@/hooks/useProductsContext";
import { CatalogProduct } from "@/types/Product";
import ProductCardLoading from "./ProductCardLoading";
import ErrorMessage from "../composite/ErrorMessage";
import Iterate from "../wrapper/Iterate";

export default function ProductsList() {
  const {
    productPages,
    isLoading,
    isLoadingPage,
    isError,
    error,
    nextPage,
    search,
  } = useProductsContext();
  const { ref, inView } = useInView();

  useEffect(() => {
    inView && nextPage();
  }, [inView, nextPage]);

  if (isLoading)
    return (
      <Space direction="vertical" size={"large"}>
        {Iterate({ Component: ProductCardLoading })}
      </Space>
    );

  if (isError)
    return <ErrorMessage message={error?.message} onRetry={search} />;

  if (productPages)
    return (
      <>
        {productPages.map((page, pIndex) => (
          <List
            key={page.cursor}
            dataSource={page.items}
            itemLayout="vertical"
            renderItem={(item: CatalogProduct) => (
              <ProductCard key={item.catalogObjectId} item={item} />
            )}
            footer={productPages.length === pIndex + 1 && <div ref={ref}></div>}
          />
        ))}
        {isLoadingPage && <Spin style={{ marginBottom: 20 }} />}
      </>
    );
}
