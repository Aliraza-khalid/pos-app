import { Typography } from "antd";
import { TitleProps } from "antd/es/typography/Title";
import React from "react";

export default function Title(props: TitleProps) {
  return <Typography.Title {...props}>{props.title}</Typography.Title>;
}
