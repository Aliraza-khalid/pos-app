import { Flex } from "antd";
import { createStyles } from "antd-style";
import React from "react";
import Title from "../base/Title";

type PropTypes = {
  title: string;
  right1?: React.ReactNode;
  right2?: React.ReactNode;
};

export default function PageHeader({ title, right1, right2 }: PropTypes) {
  const { styles } = useStyles();

  return (
    <Flex justify="space-between" gap={12} className={styles.row}>
      <Title title={title} level={2} ellipsis />

      <Flex justify="flex-end" gap={8} style={{ flex: 1 }}>
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
