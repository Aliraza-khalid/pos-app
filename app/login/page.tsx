"use client";

import React, { useState } from "react";
import LoginCard from "@/components/LoginCard";
import { Flex } from "antd";
import { useRouter } from "next/navigation";
import GetLoginUrl from "@/utils/apis/getLoginUrl";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onClickLogin = async () => {
    setLoading(true);
    const url = await GetLoginUrl();

    if (url) {
      router.push(url);
    }
  };

  return (
    <Flex align="center" justify="center" style={{ height: "100vh" }}>
      <LoginCard loading={loading} onClickLogin={onClickLogin} />
    </Flex>
  );
}
