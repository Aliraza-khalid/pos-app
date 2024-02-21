"use client";

import React from "react";
import { Card, Flex } from "antd";

type PropTypes = {
  children: React.ReactNode;
}

export default function CategoriesCard({children}: PropTypes) {
  return (
    <Card
      title="Categories"
      size="small"
      headStyle={{ textAlign: "center" }}
    >
      <Flex vertical align="center">
        {children}
      </Flex>
    </Card>
  );
}
