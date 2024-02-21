import type { Metadata } from "next";
import RootProvider from "@/providers/RootProvider";
import AntdConfig from "@/constants/AntdConfig";
import NotificationProvider from "@/providers/NotificationProvider";
import { StylesObject } from "@/types/General";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
    <RootProvider>
      <NotificationProvider>
        <html lang="en" style={styles.html}>
          <body style={styles.body}>
            <>
              {children}
              <ReactQueryDevtools initialIsOpen={false} />
            </>
          </body>
        </html>
      </NotificationProvider>
    </RootProvider>
  );
}

const styles: StylesObject = {
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
