import { ReactNode } from "react";
import { Flex, Space } from "antd";
import Text from "@/components/base/Text";

type PropTypes = {
  title: string;
  icon?: ReactNode;
  right?: ReactNode;
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
