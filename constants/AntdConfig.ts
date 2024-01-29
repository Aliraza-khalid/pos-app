import { ThemeConfig, theme } from "antd";

const AntdConfig: ThemeConfig = {
  token: {
    colorBgBase: "#00101e",
    colorBgContainer: "#00172b",
    colorBorder: "#004683",

    colorPrimary: "#0d5ca5",
    colorInfo: "#0d5ca5",
    colorTextBase: "#fff",
    colorLink: "#FFD717",
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
