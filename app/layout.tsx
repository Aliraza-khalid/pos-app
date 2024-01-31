import type { Metadata } from "next";
import RootContainer from "@/containers/RootContainer";
import AntdConfig from "@/constants/AntdConfig";

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
    <RootContainer>
      <html lang="en">
        <body style={{ backgroundColor: AntdConfig.token?.colorBgBase }}>{children}</body>
      </html>
    </RootContainer>
  );
}
