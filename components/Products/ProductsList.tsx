import { CatalogProduct } from "@/types/Product";
import { List, Spin } from "antd";
import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import useProductsContext from "@/hooks/useProductsContext";
import Text from "@/components/base/Text";
import { useInView } from "react-intersection-observer";

export default function ProductsList() {
  const { productPages, isLoading, isError, isLoadingPage, nextPage } =
    useProductsContext();
  const { ref, inView } = useInView();

  useEffect(() => {
    inView && nextPage();
  }, [inView, nextPage]);

  const renderItem = () => {};

  if (isLoading)
    return <Text title="Loading..." style={{ textAlign: "center" }} />;

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
            renderItem={(item: CatalogProduct, eIndex) =>
              productPages.length === pIndex + 1 &&
              page.items.length === eIndex + 1 ? (
                <div key={eIndex} ref={ref}>
                  <ProductCard key={item.catalogObjectId} item={item} />
                </div>
              ) : (
                <ProductCard key={item.catalogObjectId} item={item} />
              )
            }
          />
        ))}
        {isLoadingPage && <Spin style={{ marginBottom: 20 }} />}
      </>
    );
}
