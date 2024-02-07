import { Skeleton } from "antd";
import React from "react";

type PropTypes = {
  loading: boolean;
  children: React.ReactNode;
};

export default function Loading({ loading, children }: PropTypes) {
  if (loading) return <Skeleton.Button style={{ height: 20 }} />;
  return children;
}
