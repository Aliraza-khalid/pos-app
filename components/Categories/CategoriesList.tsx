import dynamic from "next/dynamic";
import { Menu, MenuProps, Skeleton, Space } from "antd";
import capitalizeText from "@/utils/capitalizeText";
import Iterate from "@/components/wrapper/Iterate";
import { Category } from "@/types/Category";
import { createStyles } from "antd-style";

const ErrorMessage = dynamic(
  () => import("@/components/composite/ErrorMessage"),
  {
    ssr: false,
  }
);

type PropTypes = {
  categories: Category[] | undefined;
  loading: boolean;
  error: Error | null;
  categoryId: string;
  retry: () => void;
  onClick: (id: string) => void;
};

type MenuItem = Required<MenuProps>["items"][number];

export default function CategoriesList({
  categories,
  loading,
  error,
  categoryId,
  retry,
  onClick,
}: PropTypes) {
  const { styles } = useStyles();

  if (loading)
    return (
      <Space
        direction="vertical"
        style={{ width: "100%" }}
        data-test={"categories-loading"}
      >
        {Iterate({ Component: () => <Skeleton.Button block active /> })}
      </Space>
    );
  if (error) return <ErrorMessage message={error.message} onRetry={retry} />;
  if (categories)
    return (
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={[categoryId]}
        className={styles.menu}
        onClick={(e) => onClick(e.key)}
        items={categories?.map(
          (item) =>
            ({
              key: item.id,
              label: capitalizeText(item.name),
            } as MenuItem)
        )}
      />
    );
}

const useStyles = createStyles(({ token, css }) => ({
  menu: css`
    width: 100%;
    font-size: ${token.fontSize}px;
  `,
}));
