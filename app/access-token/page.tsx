"use client";

import React, { useEffect, useRef, useState } from "react";
import { Flex, Spin } from "antd";
import { useRouter } from "next/navigation";
import LoginFailedCard from "@/components/auth/LoginFailedCard";
import getAccessToken from "@/utils/apis/getAccessToken";
import { PageProps } from "@/types/PageProps";
import { useMutation } from "@tanstack/react-query";
import { LoginData } from "@/types/Login";

export default function AccessToken({ searchParams }: PageProps) {
  const router = useRouter();
  const code = searchParams?.code;
  const apiCalled = useRef(false);

  const handleSuccess = (data: LoginData | null) => {
    if (!data) return;
    localStorage.setItem("accessToken", JSON.stringify(data.token));
    localStorage.setItem("merchant", JSON.stringify(data.merchant));
    localStorage.setItem("locations", JSON.stringify(data.locations));
    router.replace("/dashboard");
  };

  const { data, isPending, isError, mutate } = useMutation({
    mutationKey: ["loginUrl"],
    mutationFn: (code: string) => getAccessToken(code),
    onSuccess: handleSuccess,
  });

  useEffect(() => {
    //   const verifyToken = async (code: string) => {
    //     setLoading(true);
    //     const result = await getAccessToken(code);
    //     if (result) {
    //       localStorage.setItem("accessToken", JSON.stringify(result.token));
    //       localStorage.setItem("merchant", JSON.stringify(result.merchant));
    //       localStorage.setItem("locations", JSON.stringify(result.locations));
    //       router.replace("/dashboard");
    //     } else setLoading(false);
    //   };

    if (code && !apiCalled.current) {
      mutate(code as string);
      apiCalled.current = true;
    }
  }, [code, mutate]);

  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      {isPending && <Spin size="large" />}
      {isError && <LoginFailedCard />}
    </Flex>
  );
}
