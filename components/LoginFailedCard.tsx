import { Button, Card } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

export default function LoginFailedCard() {
  const router = useRouter();

  return (
    <Card title="Authentication Failed" style={{ width: 300, margin: 12 }}>
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
