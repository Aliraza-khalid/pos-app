"use client";

import { PropsWithChildren, useRef } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ConfigProvider } from "antd";
import { StyleProvider, extractStaticStyle } from "antd-style";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AntdConfig from "@/constants/AntdConfig";
import makeQueryClient from "@/utils/getQueryClient";

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important so we don't re-make a new client if React
    // supsends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function RootProvider({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();
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
