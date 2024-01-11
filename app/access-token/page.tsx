"use client";

import { Button, Card, Flex, Spin } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const GetAccessToken = async (code: string) => {
  const res = await fetch(
    `http://localhost:5000/api/access-token?code=${code}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  if(data.success) return data.result;
  else return null;
};

export default function AccessToken() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const queryParams = useSearchParams();
  const code = queryParams.get('code');
  
  useEffect(() => {
    code ? verifyToken(code) : setLoading(false);
  }, [code])

  const verifyToken = async (code: string) => {
    const result = await GetAccessToken(code as string);
    if(result) {
      localStorage.setItem('accessToken', JSON.stringify(result.token));
      localStorage.setItem('merchant', JSON.stringify(result.merchant));
      localStorage.setItem('locations', JSON.stringify(result.locations));
      router.replace('/');
    }
    else setLoading(false);
  }

  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Card title="Authentication Failed" style={{ width: 300, margin: 12 }}>
          <Button
            value="large"
            block
            type="primary"
            onClick={() => router.replace('/login')}
            loading={loading}
          >
            Try Again
          </Button>
        </Card>
      )}
    </Flex>
  );
}
