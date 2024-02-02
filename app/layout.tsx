import type { Metadata } from "next";
import RootContainer from "@/containers/RootContainer";
import AntdConfig from "@/constants/AntdConfig";
import { CSSProperties } from "react";

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
      <html lang="en" style={styles.html}>
        <body style={styles.body}>{children}</body>
      </html>
    </RootContainer>
  );
}

const styles: { [key: string]: CSSProperties } = {
  html: {
    colorScheme: "dark",
  },
  body: {
    backgroundColor: AntdConfig.token?.colorBgBase,
    padding: 0,
    margin: 0,
    maxWidth: "100vw",
    overflowX: "hidden",
  },
};
