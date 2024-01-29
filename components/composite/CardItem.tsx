import { Flex, Space } from "antd";
import Text from "@/components/base/Text";
import React from "react";

type PropTypes = {
  title: string;
  icon?: React.ReactNode;
  right?: React.ReactNode;
  containerClass?: string;
  titleClass?: string;
};

export default function CardItem({
  title,
  icon,
  right,
  containerClass,
  titleClass,
}: PropTypes) {
  return (
    <Flex justify="space-between" className={containerClass}>
      <Space>
        <Text title={title} className={titleClass} />
        {icon}
      </Space>
      {right}
    </Flex>
  );
}
