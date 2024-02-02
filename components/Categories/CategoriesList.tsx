import React from "react";
import { Button, Skeleton, Space } from "antd";
import Text from "@/components/base/Text";
import useProductsContext from "@/hooks/context/useProductsContext";
import { capitalizeText } from "@/utils/capitalizeText";
import useCategoriesQuery from "@/hooks/query/useCategoriesQuery";

export default function CategoriesList() {
  const { categoryId, searchByCategory } = useProductsContext();
  const { data: categories, isError, isLoading, error } = useCategoriesQuery();

  const buttonType = (id: string) => {
    return categoryId === id ? undefined : "text";
  };

  if (isLoading)
    return (
      <Space direction="vertical" style={{width: '100%'}}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton.Button key={i} block active/>
        ))}
      </Space>
    );
  if (isError) return <Text title={error.message} />;
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
