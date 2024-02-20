"use client";

import { PropsWithChildren, useRef } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ConfigProvider } from "antd";
import { StyleProvider, extractStaticStyle } from "antd-style";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AntdConfig from "@/constants/AntdConfig";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5000,
    },
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
          <AntdRegistry>
            <>{children}</>
          </AntdRegistry>
        </StyleProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
}
