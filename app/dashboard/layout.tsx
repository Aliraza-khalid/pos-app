"use client";

import { useEffect } from "react";
import { Menu, MenuProps, Typography } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { createStyles } from "antd-style";
import { usePathname, useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { isAuthenticated } from "@/utils/isAuthenticated";

const queryClient = new QueryClient();

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    // router.push("/dashboard/cart");
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
          <Typography.Title className={styles.headerTitle}>POS app</Typography.Title>
          <Menu mode="horizontal" items={items} selectedKeys={[path]} />
        </Header>
        <Content className={styles.content}>{children}</Content>
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
    background-color: ${token.colorBgBase};
  `,
  headerTitle: css`
    margin-bottom: 0;
    
    @media screen and (max-width: 425px) {
      font-size: ${token.fontSizeHeading2}px;
    }
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
  `,
}));
