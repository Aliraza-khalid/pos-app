"use client";

import React from "react";
import { Button, Flex, Skeleton, Space } from "antd";
import capitalizeText from "@/utils/capitalizeText";
import useCategoriesQuery from "@/hooks/useCategoriesQuery";
import ErrorMessage from "@/components/composite/ErrorMessage";
import Iterate from "@/components/wrapper/Iterate";
import useProductsQuery from "@/hooks/useProductsQuery";
import { CheckOutlined } from "@ant-design/icons";

export default function CategoriesList() {
  const { categoryId, searchByCategory } = useProductsQuery();
  const {
    data: categories,
    isError,
    isLoading,
    error,
    refetch,
  } = useCategoriesQuery();

  if (isLoading)
    return (
      <Space
        direction="vertical"
        style={{ width: "100%" }}
        data-test={"categories-loading"}
      >
        {Iterate({ Component: () => <Skeleton.Button block active /> })}
      </Space>
    );
  if (isError)
    return <ErrorMessage message={error.message} onRetry={() => refetch} />;
  if (categories)
    return categories?.map((item, i) => (
      <Button
        key={i}
        type="text"
        block
        data-test={`category-button-${i}`}
        onClick={() => searchByCategory(item.id)}
      >
        <Flex justify="space-between" align="center">
          {capitalizeText(item.name)}
          {categoryId === item.id && <CheckOutlined />}
        </Flex>
      </Button>
    ));
}
