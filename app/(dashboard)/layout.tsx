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

    @media screen and (min-width: ${token.screenMD}px) {
      padding-left: 6%;
      padding-right: 6%;
    }

    @media screen and (min-width: ${token.screenLG}px) {
      padding-left: 10%;
      padding-right: 10%;
    }

    @media screen and (min-width: ${token.screenXL}px) {
      padding-left: 12%;
      padding-right: 12%;
    }

    @media screen and (min-width: ${token.screenXXL}px) {
      padding-left: 14%;
      padding-right: 14%;
    }

    @media screen and (min-width: 1920px) {
      padding-left: 18%;
      padding-right: 18%;
    }
  `,
}));
