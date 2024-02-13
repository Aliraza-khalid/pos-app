"use client";

import { Flex } from "antd";
import { createStyles, useTheme } from "antd-style";
import React from "react";
import Title from "@/components/base/Title";

type PropTypes = {
  title: string;
  contentSecondFromRight?: React.ReactNode;
  contentRightMost?: React.ReactNode;
};

export default function PageHeader({
  title,
  contentSecondFromRight,
  contentRightMost,
}: PropTypes) {
  const theme = useTheme();

  return (
    <Flex justify="space-between" gap={theme.margin}>
      <Title title={title} level={2} ellipsis />

      <Flex justify="flex-end" gap={theme.marginXS} style={{ flex: 1 }}>
        {contentSecondFromRight}
        {contentRightMost}
      </Flex>
    </Flex>
  );
}
