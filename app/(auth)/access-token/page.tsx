"use client";

import React from "react";
import { PageProps } from "@/types/PageProps";
import AccessTokenContainer from "@/containers/AccessTokenContainer";

export default function AccessToken({ searchParams }: PageProps) {
  const authCode = searchParams?.code as string;

  return (
    <AccessTokenContainer authenticationCode={authCode}/>
  );
}
