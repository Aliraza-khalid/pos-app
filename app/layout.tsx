import type { Metadata } from "next";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, theme } from "antd";
import AntdToken  from "@/constants/AntdToken";
import ComponentToken from "@/constants/ComponentToken";
import "./globals.css";

export const metadata: Metadata = {
  title: "POS app",
  description: "developed by carbonteq",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfigProvider
      theme={{
        token: AntdToken,
        components: ComponentToken,
        // algorithm: theme.darkAlgorithm,
      }}
    >
      <html lang="en">
        <body>
          <AntdRegistry>{children}</AntdRegistry>
        </body>
      </html>
    </ConfigProvider>
  );
}
