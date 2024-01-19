import getCategories from "@/utils/apis/getCategories";
import { useQuery } from "@tanstack/react-query";
import { Button, Typography } from "antd";
import React from "react";

type PropTypes = {
  selectedCategoryId: string;
  onClickCategory: (id: string) => void;
};

export default function CategoriesList({
  onClickCategory,
  selectedCategoryId,
}: PropTypes) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const buttonType = (id: string) => {
    return selectedCategoryId === id ? undefined : "text"
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
