"use client";

import GetCategories from "@/utils/apis/getCategories";
import { useQuery } from "@tanstack/react-query";
import { Button, Card } from "antd";
import React from "react";

type PropTypes = {
  onClickCategory: (id: string) => void;
}

export default function Categories({onClickCategory}: PropTypes) {
  const {data, isLoading, isError} = useQuery({
    queryKey: ["categories"],
    queryFn: GetCategories,
  });

  return (
    <Card
      title="Categories"
      size="small"
      headStyle={{ textAlign: "center" }}
      style={{ width: 230 }}
    >
      {isLoading && <p>Loading...</p>}
      {isError && <p>No Data Found</p>}
      {data?.map((item: any, i: number) => (
        <Button key={i} type="text" block onClick={() => onClickCategory(item.id)}>
          {item.name}
        </Button>
      ))}
    </Card>
  );
}
