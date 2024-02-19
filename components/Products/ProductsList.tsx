import { useEffect } from "react";
import dynamic from "next/dynamic";
import * as Sentry from "@sentry/nextjs";
import { Flex, List, Space, Spin } from "antd";
import { useInView } from "react-intersection-observer";
import ProductCard from "./ProductCard";
import ProductCardLoading from "./ProductCardLoading";
import Iterate from "../wrapper/Iterate";
import { CatalogProduct } from "@/types/Product";
import { createStyles } from "antd-style";
import Text from "../base/Text";

const ErrorMessage = dynamic(
  () => import("@/components/composite/ErrorMessage"),
  {
    ssr: false,
  }
);

type PropTypes = {
  products: CatalogProduct[] | undefined;
  loading: boolean;
  pageLoading: boolean;
  error: Error | null;
  nextPage: () => void;
  retry: () => void;
};

export default function ProductsList({
  products,
  loading,
  pageLoading,
  error,
  nextPage,
  retry,
}: PropTypes) {
  const { styles, theme } = useStyles();
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

  if (products)
    return (
      <Sentry.ErrorBoundary fallback={<ErrorMessage onRetry={retry} />}>
        <List
          dataSource={products}
          data-test={`products-list`}
          grid={{
            gutter: [theme.marginLG, theme.margin],
            xs: 1,
            sm: 2,
            md: 2,
            lg: 2,
            xl: 3,
            xxl: 3,
          }}
          renderItem={(item: CatalogProduct) => (
            <List.Item key={item.catalogObjectId}>
              <ProductCard item={item} />
            </List.Item>
          )}
          footer={<div ref={ref}></div>}
        />

        <Flex justify="center" style={{ marginBottom: theme.marginXXL }}>
          {pageLoading ? (
            <Spin />
          ) : (
            <Text title="No More Data" className={styles.end} />
          )}
        </Flex>
      </Sentry.ErrorBoundary>
    );
}

const useStyles = createStyles(({ css, token }) => ({
  end: css`
    color: ${token.colorTextTertiary};
  `,
}));
