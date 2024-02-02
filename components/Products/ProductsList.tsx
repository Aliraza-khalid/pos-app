import React, { useEffect } from "react";
import { List, Space, Spin } from "antd";
import { useInView } from "react-intersection-observer";
import ProductCard from "./ProductCard";
import Text from "@/components/base/Text";
import useProductsContext from "@/hooks/context/useProductsContext";
import { CatalogProduct } from "@/types/Product";
import ProductCardLoading from "./ProductCardLoading";

export default function ProductsList() {
  const { productPages, isLoading, isError, isLoadingPage, nextPage } =
    useProductsContext();
  const { ref, inView } = useInView();

  useEffect(() => {
    inView && nextPage();
  }, [inView, nextPage]);

  if (isLoading)
    return (
      <Space direction="vertical" size={"large"}>
        {[1, 2, 3, 4, 5].map((i) => (
          <ProductCardLoading key={i} />
        ))}
      </Space>
    );

  if (isError)
    return <Text title="No Data Found" style={{ textAlign: "center" }} />;

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
