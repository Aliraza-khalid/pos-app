"use client";

import { PropsWithChildren } from "react";
import Layout, { Content, Header } from "antd/es/layout/layout";
import { createStyles } from "antd-style";
import DashboardContainer from "@/containers/DashboardContainer";
import HeaderMenu from "@/components/HeaderMenu";
import Title from "@/components/base/Title";

export default function DashboardLayout({ children }: PropsWithChildren) {
  const { styles } = useStyles();

  return (
    <DashboardContainer>
      <Layout className={styles.layout}>
        <Header className={styles.header}>
          <Title title="POS app" ellipsis className={styles.headerTitle} />
          <HeaderMenu />
        </Header>

        <Content className={styles.content}>{children}</Content>
      </Layout>
    </DashboardContainer>
  );
}

const useStyles = createStyles(({ token, css }) => ({
  layout: css`
    height: 100vh;
  `,
  header: css`
    position: sticky;
    top: 0;
    z-index: 1;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${token.colorBgElevated};
  `,
  headerTitle: css`
    margin-bottom: 0;
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
