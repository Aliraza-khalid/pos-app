import { ThemeConfig, theme } from "antd";

const AntdConfig: ThemeConfig = {
  token: {
    colorBgBase: "#111d2c",
    colorBgContainer: "#112a45",
    colorBorder: "#3c9ae8",

    colorBorderBg: 'transparent',

    colorPrimary: "#177ddc",
    colorInfo: "#0d5ca5",
    colorTextBase: "#fff",
    colorLink: "#FFD717",
    colorSuccess: "#349e00",
    sizeStep: 4,
    borderRadius: 8,
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
    Menu: {
      darkItemBg: '#FFFFFF00'
    }
  },
  algorithm: theme.darkAlgorithm,
};

export default AntdConfig;
