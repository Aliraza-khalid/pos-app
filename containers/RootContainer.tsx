"use client";

import AntdToken from "@/constants/AntdToken";
import ComponentToken from "@/constants/ComponentToken";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import React, { PropsWithChildren } from "react";

const queryClient = new QueryClient();

export default function RootContainer({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: AntdToken,
          components: ComponentToken,
          // algorithm: theme.darkAlgorithm,
        }}
      >
        <AntdRegistry>{children}</AntdRegistry>
      </ConfigProvider>
    </QueryClientProvider>
  );
}
