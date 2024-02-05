import { Button, Space } from "antd";
import React from "react";
import Title from "../base/Title";
import Text from "../base/Text";

type PropTypes = {
  error: Error;
  reset: () => void;
};

export default function ErrorPageMessage({ error, reset }: PropTypes) {
  return (
    <Space direction="vertical" align="center" size="large">
      <Title title="Something went wrong!" level={3} />
      <Text title={error.message} />
      <Button onClick={reset}>Try again</Button>
    </Space>
  );
}
