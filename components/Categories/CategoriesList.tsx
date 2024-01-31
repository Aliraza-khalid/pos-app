import React from "react";
import { Button } from "antd";
import Text from "@/components/base/Text";
import useCategoriesContext from "@/hooks/context/useCategoriesContext";
import useProductsContext from "@/hooks/context/useProductsContext";
import { capitalizeText } from "@/utils/capitalizeText";

export default function CategoriesList() {
  const { categoryId, searchByCategory } = useProductsContext();
  const { categories, isError, isLoading } = useCategoriesContext();

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
