import { Button, Card } from "antd";
import React from "react";

type PropTypes = {
  onClickLogin: () => void;
  loading: boolean;
}

export default function LoginCard({loading, onClickLogin}: PropTypes) {
  return (
    <Card title="Login" style={{ width: 300, margin: 12 }}>
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
