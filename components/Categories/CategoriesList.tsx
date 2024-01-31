import React from "react";
import { Button } from "antd";
import Text from "@/components/base/Text";
import useProductsContext from "@/hooks/context/useProductsContext";
import { capitalizeText } from "@/utils/capitalizeText";
import useCategories from "@/hooks/query/useCategories";

export default function CategoriesList() {
  const { categoryId, searchByCategory } = useProductsContext();
  const { data: categories, isError, isLoading } = useCategories();

  const buttonType = (id: string) => {
    return categoryId === id ? undefined : "text";
  };

  if (isLoading) return <Text title="Loading..." />;
  if (isError) return <Text title="No Data Found" />;
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
