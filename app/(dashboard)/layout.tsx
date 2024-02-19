"use client";

import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout, { Content, Header } from "antd/es/layout/layout";
import { createStyles } from "antd-style";
import HeaderMenu from "@/components/HeaderMenu";
import Title from "@/components/base/Title";
import isAuthenticated from "@/utils/isAuthenticated";

export default function DashboardLayout({ children }: PropsWithChildren) {
  const { styles } = useStyles();
  const router = useRouter();

  useEffect(() => {
    !isAuthenticated() && router.replace("/login");
  }, [router]);

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <Title title="POS app" ellipsis />
        <HeaderMenu />
      </Header>

      <Content className={styles.content}>{children}</Content>
    </Layout>
  );
}

const useStyles = createStyles(({ token, css }) => ({
  layout: css`
    height: 100vh;
  `,
  header: css`
    position: sticky;
    top: 0;
    z-index: 5;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${token.colorBgElevated};
  `,
  content: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
    padding: 5%;
    min-height: 100vh;

    @media screen and (min-width: ${token.screenXXL}px) {
      padding-left: 9%;
      padding-right: 9%;
    }

    @media screen and (min-width: 2160px) {
      padding-left: 12%;
      padding-right: 12%;
    }
  `,
}));
