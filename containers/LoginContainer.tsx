"use client";

import React from "react";
import LoginCard from "@/components/auth/LoginCard";
import getLoginUrl from "@/services/getLoginUrl";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import useNotificationContext from "@/hooks/useNotificationContext";
import * as Sentry from "@sentry/nextjs";

export default function LoginContainer() {
  const router = useRouter();
  const { showErrorNotification } = useNotificationContext();

  const onSuccess = (url: string) => router.push(url as any);

  const onError = (error: Error) => {
    Sentry.captureException(error);
    showErrorNotification({
      message: "Login Error",
      description: error?.message,
    });
  };

  const { isPending, mutate } = useMutation({
    mutationKey: ["loginUrl"],
    mutationFn: getLoginUrl,
    onSuccess,
    onError,
  });

  const onClickLogin = () => mutate();

  return <LoginCard loading={isPending} onClickLogin={onClickLogin} />;
}
