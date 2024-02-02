import { Card, Flex, Space } from "antd";
import SkeletonButton from "antd/es/skeleton/Button";
import SkeletonInput from "antd/es/skeleton/Input";
import React from "react";

export default function ProductCardLoading() {
  return (
    <Card title={<SkeletonInput active style={{ height: 20, width: "20%" }} />}>
      <Space direction="vertical" style={{ width: "100%" }} size={"large"}>
        <SkeletonButton active style={{ height: 20 }} />

        <Flex justify="space-between">
          <SkeletonInput active />
          <SkeletonButton active shape="round" />
        </Flex>
      </Space>
    </Card>
  );
}
