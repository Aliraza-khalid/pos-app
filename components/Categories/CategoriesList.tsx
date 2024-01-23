import useProductsContext from "@/hooks/useProductsContext";
import getCategories from "@/utils/apis/getCategories";
import { useQuery } from "@tanstack/react-query";
import { Button, Typography } from "antd";
import React from "react";

export default function CategoriesList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { categoryId, setCategoryId, search } = useProductsContext();

  const onClickCategory = (id: string) => {
    setCategoryId((v: any) => (v === id ? "" : id));
    setTimeout(() => {
      search();
    }, 0);
  };

  const buttonType = (id: string) => {
    return categoryId === id ? undefined : "text"
  }

  if (isLoading) return <Typography.Text>Loading...</Typography.Text>;
  if (isError) return <Typography.Text>No Data Found</Typography.Text>;
  if (data)
    return data?.map((item, i) => (
      <Button
        key={i}
        type={buttonType(item.id)}
        block
        onClick={() => onClickCategory(item.id)}
      >
        {item.name}
      </Button>
    ));
}
