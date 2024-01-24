"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Flex } from "antd";
import LoginCard from "@/components/auth/LoginCard";
import getLoginUrl from "@/utils/apis/getLoginUrl";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onClickLogin = async () => {
    setLoading(true);
    const url = await getLoginUrl();

    if (url) {
      router.push(url as any);
    }
  };

  return (
    <Flex align="center" justify="center" style={{ height: "100vh" }}>
      <LoginCard loading={loading} onClickLogin={onClickLogin} />
    </Flex>
  );
}
