"use client";

import LoginFailedCard from "@/components/auth/LoginFailedCard";
import { PageProps } from "@/types/PageProps";
import getAccessToken from "@/utils/apis/getAccessToken";
import { Flex, Spin } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function AccessToken({searchParams}: PageProps) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const code = searchParams?.code;
  const apiCalled = useRef(false);

  useEffect(() => {
    if(code && !apiCalled.current) {
      verifyToken(code as string);
      apiCalled.current = true;
    }
  }, [code]);

  const verifyToken = async (code: string) => {
    setLoading(true);
    const result = await getAccessToken(code as string);
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
