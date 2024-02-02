"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Spin } from "antd";
import LoginFailedCard from "@/components/auth/LoginFailedCard";
import getAccessToken from "@/services/getAccessToken";
import { LoginData } from "@/types/Login";
import useNotificationContext from "@/hooks/context/useNotificationContext";

type PropTypes = {
  authenticationCode: string;
};

export default function AccessTokenContainer({
  authenticationCode,
}: PropTypes) {
  const router = useRouter();
  const apiCalled = useRef(false);
  const { showErrorNotification } = useNotificationContext();

  const handleSuccess = (data: LoginData) => {
    if (!data) return;
    localStorage.setItem("accessToken", JSON.stringify(data.token));
    localStorage.setItem("merchant", JSON.stringify(data.merchant));
    localStorage.setItem("locations", JSON.stringify(data.locations));
    router.replace("/dashboard");
  };

  const { isPending, isError, mutate } = useMutation({
    mutationKey: ["loginUrl"],
    mutationFn: (authCode: string) => getAccessToken(authCode),
    onSuccess: handleSuccess,
    onError: (error) =>
      showErrorNotification({
        description: error.message,
      }),
  });

  useEffect(() => {
    if (authenticationCode && !apiCalled.current) {
      mutate(authenticationCode);
      apiCalled.current = true;
    }
  }, [authenticationCode, mutate]);

  return (
    <>
      {isPending && <Spin size="large" />}
      {isError && <LoginFailedCard />}
    </>
  );
}
