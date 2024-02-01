import { Typography } from "antd";
import { createStyles } from "antd-style";
import { TitleProps } from "antd/es/typography/Title";
import React from "react";

export default function Title(props: TitleProps) {
  const { styles, cx } = useStyles();
  return (
    <Typography.Title {...props} className={cx(styles.title, props.className)}>
      {props.title}
    </Typography.Title>
  );
}

const useStyles = createStyles(() => ({
  title: {
    marginTop: 0,
  },
}));
