import { ThemeConfig, theme } from "antd";

const AntdConfig: ThemeConfig = {
  token: {
    // colorBgBase: "#615545",
    // colorBgLayout: "#121112",
    // colorBgContainer: "#615545",
    colorBgElevated: "#615545",

    colorPrimary: "#9b773d",
    colorInfo: "#9b773d",
    colorTextBase: "#fff",
    colorSuccess: "#349e00",
    sizeStep: 4,
    borderRadius: 8,
    fontSize: 12,
    padding: 12,
    margin: 12,
    screenXS: 420,
    screenXSMin: 420,
  },
  components: {
    Button: {
      fontWeight: 500,
    },
    Typography: {
      titleMarginBottom: 0,
    },
  },
  algorithm: theme.darkAlgorithm,
};

export default AntdConfig;
