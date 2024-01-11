"use client";

import { Button, Card } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const GetLoginUrl = async () => {
  const res = await fetch("http://localhost:5000/api/login", {
    cache: "no-store",
  });
  const data = await res.json();

  if (data.success) return data.result.url;
  else return null;
};

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onClickLogin = async () => {
    setLoading(true);
    const url = await GetLoginUrl();
    
    if (url) {
      router.push(url);
    }
  };

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
