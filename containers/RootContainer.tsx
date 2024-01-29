"use client";

import AntdConfig from "@/constants/AntdConfig";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, theme } from "antd";
import React, { PropsWithChildren } from "react";

const queryClient = new QueryClient();

export default function RootContainer({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={AntdConfig}>
        <AntdRegistry>{children}</AntdRegistry>
      </ConfigProvider>
    </QueryClientProvider>
  );
}
