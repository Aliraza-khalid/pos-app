"use client";

import Title from "@/components/base/Title";
import Text from "@/components/base/Text";
import * as Sentry from "@sentry/nextjs";
import { Button, Space } from "antd";
import { useEffect } from "react";
import AntdConfig from "@/constants/AntdConfig";
import ErrorPageMessage from "@/components/composite/ErrorPageMessage";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html style={{ colorScheme: "dark" }}>
      <body style={{ backgroundColor: AntdConfig.token?.colorBgBase }}>
        <ErrorPageMessage error={error} reset={reset} />
      </body>
    </html>
  );
}
