import fs from "fs";
import React from "react";
import { extractStyle } from "@ant-design/static-style-extract";
import { ConfigProvider } from "antd";
import AntdConfig from "../constants/AntdConfig";

const outputPath = "./public/antd.min.css";

const css = extractStyle((node) => (
  <ConfigProvider theme={AntdConfig}>{node}</ConfigProvider>
));

fs.writeFileSync(outputPath, css);
