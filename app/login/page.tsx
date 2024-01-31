"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Flex } from "antd";
import LoginCard from "@/components/auth/LoginCard";
import getLoginUrl from "@/utils/apis/getLoginUrl";
import { useQuery } from "@tanstack/react-query";

export default function Login() {
  const router = useRouter();

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["loginUrl"],
    queryFn: getLoginUrl,
    enabled: false,
  });

  useEffect(() => {
    data && router.push(data as any);
  }, [data, router]);

  return (
    <Flex align="center" justify="center" style={{ height: "100vh" }}>
      <LoginCard loading={isFetching} onClickLogin={() => refetch()} />
    </Flex>
  );
}
