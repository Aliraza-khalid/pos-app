import { Button, Space } from "antd";
import Text from "@/components/base/Text";
import React from "react";

type PropTypes = {
  message?: string;
  onRetry: () => void;
};

export default function ErrorMessage({
  message = "Error",
  onRetry,
}: PropTypes) {
  return (
    <Space direction="vertical" align="center">
      <Text title={message} />
      <Button type="link" onClick={onRetry}>
        Retry
      </Button>
    </Space>
  );
}
