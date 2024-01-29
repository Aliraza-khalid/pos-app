import useCategoriesContext from "@/hooks/useCategoriesContext";
import useProductsContext from "@/hooks/useProductsContext";
import { capitalizeText } from "@/utils/capitalizeText";
import { Button, Typography } from "antd";
import React from "react";

export default function CategoriesList() {
  const { categoryId, searchByCategory } = useProductsContext();
  const {categories, isError, isLoading} = useCategoriesContext();

  const buttonType = (id: string) => {
    return categoryId === id ? undefined : "text"
  }

  if (isLoading) return <Typography.Text>Loading...</Typography.Text>;
  if (isError) return <Typography.Text>No Data Found</Typography.Text>;
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
