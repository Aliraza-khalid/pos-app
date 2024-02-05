"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Spin } from "antd";
import LoginFailedCard from "@/components/auth/LoginFailedCard";
import getAccessToken from "@/services/getAccessToken";
import { LoginData } from "@/types/Login";
import useNotificationContext from "@/hooks/useNotificationContext";
import * as Sentry from "@sentry/nextjs";

type PropTypes = {
  authenticationCode: string;
};

export default function AccessTokenContainer({
  authenticationCode,
}: PropTypes) {
  const router = useRouter();
  const apiCalled = useRef(false);
  const { showErrorNotification } = useNotificationContext();
  const [isError, setIsError] = useState(false);

  const onSuccess = (data: LoginData) => {
    if (!data) return;
    localStorage.setItem("accessToken", JSON.stringify(data.token));
    localStorage.setItem("merchant", JSON.stringify(data.merchant));
    localStorage.setItem("locations", JSON.stringify(data.locations));
    router.replace("/products");
  };

  const onError = (error: Error) => {
    setIsError(true);
    Sentry.captureException(error);
    showErrorNotification({
      message: "Login Error",
      description: error?.message,
    });
  };

  const { mutate } = useMutation({
    mutationKey: ["loginUrl"],
    mutationFn: (authCode: string) => getAccessToken(authCode),
    onSuccess,
    onError,
  });

  useEffect(() => {
    if (authenticationCode && !apiCalled.current) {
      mutate(authenticationCode);
      apiCalled.current = true;
    }
  }, [authenticationCode, mutate]);

  return <>{isError ? <LoginFailedCard /> : <Spin size="large" />}</>;
}
