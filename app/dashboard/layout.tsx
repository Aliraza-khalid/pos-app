"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { Typography } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { createStyles } from "antd-style";
import { useRouter } from "next/navigation";
import isAuthenticated from "@/utils/isAuthenticated";
import Products from "@/components/Products/Products";
import CartDrawer from "@/components/CartDrawer";
import NavMenu from "@/components/NavMenu";
import DashboardContainer from "@/containers/DashboardContainer";

export default function DashboardLayout({ children }: PropsWithChildren) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { styles, cx, theme } = useStyles();
  const router = useRouter();

  useEffect(() => {
    !isAuthenticated() && router.replace("/login");
  }, []);

  return (
    <main>
      <DashboardContainer>
        <Header className={styles.header}>
          <Typography.Title ellipsis className={styles.headerTitle}>
            POS app
          </Typography.Title>
          <NavMenu onClickCart={() => setDrawerOpen(true)} />
        </Header>

        <Content className={styles.content}>
          <Products>{children}</Products>
        </Content>

        <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </DashboardContainer>
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
    justify-content: space-between;
    background-color: ${token.colorBgLayout};
  `,
  headerTitle: css`
    margin-bottom: 0;
  `,
  content: css`
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
