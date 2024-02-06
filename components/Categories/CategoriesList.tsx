"use client";

import React from "react";
import { Button, Skeleton, Space } from "antd";
import useProductsContext from "@/hooks/useProductsContext";
import { capitalizeText } from "@/utils/capitalizeText";
import useCategoriesQuery from "@/hooks/useCategoriesQuery";
import ErrorMessage from "../composite/ErrorMessage";
import Iterate from "../wrapper/Iterate";

export default function CategoriesList() {
  const { categoryId, searchByCategory } = useProductsContext();
  const {
    data: categories,
    isError,
    isLoading,
    error,
    refetch,
  } = useCategoriesQuery();

  const buttonType = (id: string) => {
    return categoryId === id ? undefined : "text";
  };

  if (isLoading)
    return (
      <Space direction="vertical" style={{ width: "100%" }}>
        {Iterate({ Component: () => <Skeleton.Button block active /> })}
      </Space>
    );
  if (isError)
    return <ErrorMessage message={error.message} onRetry={() => refetch} />;
  if (categories)
    return categories?.map((item, i) => (
      <Button
        key={i}
        type={buttonType(item.id)}
        block
        onClick={() => searchByCategory(item.id)}
      >
        {capitalizeText(item.name)}
      </Button>
    ));
}
