"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import ErrorPageMessage from "@/components/composite/ErrorPageMessage";

export default function Error({
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
    <ErrorPageMessage error={error} reset={reset}/>
  );
}
