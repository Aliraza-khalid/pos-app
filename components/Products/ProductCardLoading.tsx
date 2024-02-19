import { Card, Flex, Select, Skeleton, Space } from "antd";
import SkeletonButton from "antd/es/skeleton/Button";
import SkeletonImage from "antd/es/skeleton/Image";
import SkeletonInput from "antd/es/skeleton/Input";

export default function ProductCardLoading() {
  return (
    <Card
      cover={
        <Flex
          style={{ display: "flex", height: 240 }}
          justify="center"
          align="center"
        >
          <SkeletonImage />
        </Flex>
      }
      style={{ flex: 1 }}
    >
      <Space direction="vertical" style={{ width: "100%" }} size={"middle"}>
        <SkeletonInput active style={{ height: 20, width: "20%" }} />

        <SkeletonButton active style={{ height: 20 }} />

        <Flex justify="space-between">
          <SkeletonInput active />
          <SkeletonButton active shape="round" />
        </Flex>
      </Space>
    </Card>
  );
}
