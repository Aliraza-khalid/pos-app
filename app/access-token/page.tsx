"use client";

import React, { useEffect, useRef, useState } from "react";
import { Flex, Spin } from "antd";
import { useRouter } from "next/navigation";
import LoginFailedCard from "@/components/auth/LoginFailedCard";
import getAccessToken from "@/utils/apis/getAccessToken";
import { PageProps } from "@/types/PageProps";

export default function AccessToken({ searchParams }: PageProps) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const code = searchParams?.code;
  const apiCalled = useRef(false);

  useEffect(() => {
    const verifyToken = async (code: string) => {
      setLoading(true);
      const result = await getAccessToken(code);
      if (result) {
        localStorage.setItem("accessToken", JSON.stringify(result.token));
        localStorage.setItem("merchant", JSON.stringify(result.merchant));
        localStorage.setItem("locations", JSON.stringify(result.locations));
        router.replace("/dashboard");
      } else setLoading(false);
    };

    if (code && !apiCalled.current) {
      verifyToken(code as string);
      apiCalled.current = true;
    }
  }, [code, router]);

  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      {loading ? <Spin size="large" /> : <LoginFailedCard />}
    </Flex>
  );
}
