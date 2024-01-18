"use client";

import React from "react";
import { Button, Card, Flex, Typography } from "antd";
import { useQuery } from "@tanstack/react-query";
import getCategories from "@/utils/apis/getCategories";

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
    queryFn: getCategories,
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
        {data?.map((item, i) => (
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
