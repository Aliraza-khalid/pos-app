import React from "react";
import { Button, Flex, Skeleton, Space } from "antd";
import capitalizeText from "@/utils/capitalizeText";
import ErrorMessage from "@/components/composite/ErrorMessage";
import Iterate from "@/components/wrapper/Iterate";
import { CheckOutlined } from "@ant-design/icons";
import { Category } from "@/types/Category";

type PropTypes = {
  categories: Category[] | undefined;
  loading: boolean;
  error: Error | null;
  categoryId: string;
  retry: () => void;
  onClick: (id: string) => void;
};

export default function CategoriesList({
  categories,
  loading,
  error,
  categoryId,
  retry,
  onClick,
}: PropTypes) {
  if (loading)
    return (
      <Space
        direction="vertical"
        style={{ width: "100%" }}
        data-test={"categories-loading"}
      >
        {Iterate({ Component: () => <Skeleton.Button block active /> })}
      </Space>
    );
  if (error) return <ErrorMessage message={error.message} onRetry={retry} />;
  if (categories)
    return categories?.map((item, i) => (
      <Button
        key={i}
        type="text"
        block
        data-test={`category-button-${i}`}
        onClick={() => onClick(item.id)}
      >
        <Flex justify="space-between" align="center">
          {capitalizeText(item.name)}
          {categoryId === item.id && <CheckOutlined />}
        </Flex>
      </Button>
    ));
}
