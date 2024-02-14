import React, { useEffect } from "react";
import { Flex, List, Space, Spin } from "antd";
import { useInView } from "react-intersection-observer";
import ProductCard from "./ProductCard";
import { CatalogProduct } from "@/types/Product";
import ProductCardLoading from "./ProductCardLoading";
import ErrorMessage from "../composite/ErrorMessage";
import Iterate from "../wrapper/Iterate";
import * as Sentry from "@sentry/nextjs";
import { SearchProductsData } from "@/types/Search";

type PropTypes = {
  productPages: SearchProductsData[] | undefined;
  loading: boolean;
  pageLoading: boolean;
  error: Error | null;
  nextPage: () => void;
  retry: () => void;
};

export default function ProductsList({
  productPages,
  loading,
  pageLoading,
  error,
  nextPage,
  retry,
}: PropTypes) {
  const { ref, inView } = useInView();

  useEffect(() => {
    inView && nextPage();
  }, [inView, nextPage]);

  if (loading)
    return (
      <Flex vertical>
        <Space
          direction="vertical"
          size={"large"}
          data-test={"products-loading"}
        >
          {Iterate({ Component: ProductCardLoading })}
        </Space>
      </Flex>
    );

  if (error) return <ErrorMessage message={error?.message} onRetry={retry} />;

  if (productPages)
    return (
      <Sentry.ErrorBoundary fallback={<ErrorMessage onRetry={retry} />}>
        <Flex vertical>
          {productPages.map((page, pIndex) => (
            <List
              key={page.cursor}
              dataSource={page.items}
              data-test={`products-page-${pIndex}`}
              itemLayout="vertical"
              renderItem={(item: CatalogProduct) => (
                <ProductCard key={item.catalogObjectId} item={item} />
              )}
              footer={
                productPages.length === pIndex + 1 && <div ref={ref}></div>
              }
            />
          ))}
          {pageLoading && <Spin style={{ marginBottom: 20 }} />}
        </Flex>
      </Sentry.ErrorBoundary>
    );
}
