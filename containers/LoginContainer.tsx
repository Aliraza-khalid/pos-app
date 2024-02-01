"use client";

import React, { useEffect } from "react";
import LoginCard from "@/components/auth/LoginCard";
import getLoginUrl from "@/services/getLoginUrl";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";

export default function LoginContainer() {
  const {
    data: url,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["loginUrl"],
    queryFn: getLoginUrl,
    enabled: false,
  });

  useEffect(() => {
    url && redirect(url);
  }, [url]);

  return <LoginCard loading={isFetching} onClickLogin={refetch} />;
}
