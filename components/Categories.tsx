"use client";

import { Category } from "@/types/Category";
import GetCategories from "@/utils/apis/getCategories";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Flex, Typography } from "antd";
import React from "react";

type PropTypes = {
  selectedCategoryId: string;
  onClickCategory: (id: string) => void;
};

export default function Categories({
  onClickCategory,
  selectedCategoryId,
}: PropTypes) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: GetCategories,
  });

  const buttonType = (id: string) => {
    return selectedCategoryId === id ? undefined : "text";
  };

  return (
    <Card
      title="Categories"
      size="small"
      headStyle={{ textAlign: "center" }}
      style={{ width: 230 }}
    >
      <Flex vertical align="center">
        {isLoading && <Typography.Text>Loading...</Typography.Text>}
        {isError && <Typography.Text>No Data Found</Typography.Text>}
        {data?.map((item: Category, i: number) => (
          <Button
            key={i}
            type={buttonType(item.id)}
            block
            onClick={() => onClickCategory(item.id)}
          >
            {item.name}
          </Button>
        ))}
      </Flex>
    </Card>
  );
}
