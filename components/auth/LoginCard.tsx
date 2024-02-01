import { Button, Card } from "antd";
import { useTheme } from "antd-style";
import React from "react";

type PropTypes = {
  onClickLogin: () => void;
  loading: boolean;
};

export default function LoginCard({ loading, onClickLogin }: PropTypes) {
  const theme = useTheme();

  return (
    <Card title="Login" style={{ width: 300, margin: theme.margin }}>
      <Button
        value="large"
        block
        type="primary"
        onClick={onClickLogin}
        loading={loading}
      >
        Log in using Square
      </Button>
    </Card>
  );
}
