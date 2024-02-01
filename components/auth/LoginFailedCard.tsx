import { Button, Card } from "antd";
import { useTheme } from "antd-style";
import { useRouter } from "next/navigation";
import React from "react";

export default function LoginFailedCard() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Card
      title="Authentication Failed"
      style={{ width: 300, margin: theme.margin }}
    >
      <Button
        value="large"
        block
        type="primary"
        onClick={() => router.replace("/login")}
      >
        Go back
      </Button>
    </Card>
  );
}
