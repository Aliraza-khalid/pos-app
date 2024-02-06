import React from "react";
import AccessTokenContainer from "@/containers/AccessTokenContainer";
import { PageProps } from "@/types/PageProps";

export const dynamic = 'force-dynamic';

export default function AccessToken({ searchParams }: PageProps) {
  const authCode = searchParams?.code as string;

  return <AccessTokenContainer authenticationCode={authCode} />;
}
