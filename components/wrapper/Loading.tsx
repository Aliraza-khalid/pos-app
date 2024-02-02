import SkeletonButton from "antd/es/skeleton/Button";
import React from "react";

type PropTypes = {
  loading: boolean;
  children: React.ReactNode;
};

export default function Loading({ loading, children }: PropTypes) {
  if (loading) return <SkeletonButton style={{ height: 20 }} />;
  return children;
}
