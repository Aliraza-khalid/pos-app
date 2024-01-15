'use client';

import { Content, Header } from "antd/es/layout/layout";
import { createStyles } from "antd-style";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { styles, cx, theme } = useStyles();

  return (
    <main>
      <Header className={styles.header}>
      </Header>
      <Content className={styles.content}>
        {children}
      </Content>
    </main>
  );
}

const useStyles = createStyles(({ token, css }) => ({
  header: css`
    position: sticky;
    top: 0;
    z-index: 1;
    width: 100%;
    display: flex;
    align-items: center;
  `,
  content: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
    padding: 5%;
    min-height: 100vh;
  
    @media screen and (min-width: 768px) {
      padding-left: 6%;
      padding-right: 6%;
    }
  
    @media screen and (min-width: 1024px) {
      padding-left: 10%;
      padding-right: 10%;
    }
  
    @media screen and (min-width: 1320px) {
      padding-left: 12%;
      padding-right: 12%;
    }
  
    @media screen and (min-width: 1600px) {
      padding-left: 14%;
      padding-right: 14%;
    }
  
    @media screen and (min-width: 1920px) {
      padding-left: 18%;
      padding-right: 18%;
    }
  `
}));
