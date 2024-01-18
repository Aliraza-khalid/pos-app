"use client";

import LoginFailedCard from "@/components/LoginFailedCard";
import GetAccessToken from "@/utils/apis/getAccessToken";
import { Flex, Spin } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function AccessToken() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const queryParams = useSearchParams();
  const code = queryParams.get("code");
  const apiCalled = useRef(false);

  useEffect(() => {
    if(code && !apiCalled.current) {
      verifyToken(code);
      apiCalled.current = true;
    }
  }, [code]);

  const verifyToken = async (code: string) => {
    setLoading(true);
    const result = await GetAccessToken(code as string);
    if (result) {
      localStorage.setItem("accessToken", JSON.stringify(result.token));
      localStorage.setItem("merchant", JSON.stringify(result.merchant));
      localStorage.setItem("locations", JSON.stringify(result.locations));
      router.replace("/dashboard");
    } else setLoading(false);
  };

  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      {loading ? <Spin size="large" /> : <LoginFailedCard />}
    </Flex>
  );
}
