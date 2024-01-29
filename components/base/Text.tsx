import { Typography } from "antd";
import { TextProps } from "antd/es/typography/Text";
import React from "react";

interface Props extends TextProps {
  title: string;
}

export default function Text(props: Props) {
  return <Typography.Text {...props}>{props.title}</Typography.Text>;
}
