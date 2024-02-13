"use client";

import AntdConfig from "@/constants/AntdConfig";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { StyleProvider, extractStaticStyle } from "antd-style";
import { useServerInsertedHTML } from "next/navigation";
import React, { PropsWithChildren, useRef } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
  },
});

export default function RootProvider({ children }: PropsWithChildren) {
  const isInsert = useRef(false);

  useServerInsertedHTML(() => {
    // Avoid inserting styles repeatedly when rendering multiple times
    // refs: https://github.com/vercel/next.js/discussions/49354#discussioncomment-6279917
    if (isInsert.current) return;

    isInsert.current = true;

    const styles = extractStaticStyle().map((item) => item.style);

    return <>{styles}</>;
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={AntdConfig}>
        <StyleProvider cache={extractStaticStyle.cache}>
          <AntdRegistry>{children}</AntdRegistry>
        </StyleProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
}
