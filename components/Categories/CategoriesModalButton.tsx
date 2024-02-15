import { Button } from "antd";
import { createStyles } from "antd-style";
import useStore from "@/stores";
import MenuOutlined from "@ant-design/icons/ManOutlined";

export default function CategoriesModalButton() {
  const setCategoriesModalOpen = useStore(
    (state) => state.setCategoriesModalOpen
  );
  const { styles } = useStyles();

  return (
    <Button
      icon={<MenuOutlined />}
      className={styles.button}
      onClick={() => setCategoriesModalOpen(true)}
    />
  );
}

const useStyles = createStyles(({ token, css }) => ({
  button: css`
    @media screen and (min-width: ${token.screenSM}px) {
      display: none;
    }
  `,
}));
