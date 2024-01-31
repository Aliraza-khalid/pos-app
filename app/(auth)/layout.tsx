import { Flex } from "antd";
import React, { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <Flex align="center" justify="center" style={{ height: "100vh" }}>
      {children}
    </Flex>
  );
}
