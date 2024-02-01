import { Flex } from "antd";
import { createStyles } from "antd-style";
import React from "react";
import Title from "@/components/base/Title";

type PropTypes = {
  title: string;
  right1?: React.ReactNode;
  right2?: React.ReactNode;
};

export default function PageHeader({ title, right1, right2 }: PropTypes) {
  const { styles, theme } = useStyles();

  return (
    <Flex justify="space-between" gap={theme.margin} className={styles.row}>
      <Title title={title} level={2} ellipsis />

      <Flex justify="flex-end" gap={theme.marginXS} style={{ flex: 1 }}>
        {right1}
        {right2}
      </Flex>
    </Flex>
  );
}

const useStyles = createStyles(({ token, css }) => ({
  row: css`
    margin-bottom: ${token.marginXL}px;
  `,
}));
