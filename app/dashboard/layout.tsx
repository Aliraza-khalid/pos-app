"use client";

import { useEffect, useState } from "react";
import { Drawer, Menu, MenuProps, Typography } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { createStyles } from "antd-style";
import { usePathname, useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import isAuthenticated from "@/utils/isAuthenticated";
import Products from "@/components/Products/Products";
import CartDrawer from "@/components/CartDrawer";

const queryClient = new QueryClient();

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { styles, cx, theme } = useStyles();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    !isAuthenticated() && router.replace("/login");
  }, []);

  const onClickHome = () => {
    router.push("/dashboard");
  };

  const onClickCart = () => {
    setDrawerOpen(true);
  };

  const onClickLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  const items: MenuProps["items"] = [
    {
      label: "Home",
      key: "/dashboard",
      onClick: onClickHome,
    },
    {
      label: "Cart",
      key: "/dashboard/cart",
      onClick: onClickCart,
    },
    {
      label: "Log out",
      key: "logout",
      onClick: onClickLogout,
    },
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <Header className={styles.header}>
          <Typography.Title ellipsis className={styles.headerTitle}>
            POS app
          </Typography.Title>
          <Menu
            mode="horizontal"
            items={items}
            selectedKeys={[path]}
            className={styles.menu}
          />
        </Header>

        <Content className={styles.content}>
          <Products>{children}</Products>
        </Content>

        <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}/>
      </main>
    </QueryClientProvider>
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
  menu: css`
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
