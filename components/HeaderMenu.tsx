"use client";

import useCartContext from "@/hooks/useCartContext";
import useStore from "@/stores";
import cartSize from "@/utils/cartSize";
import { LogoutOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Menu, MenuProps, Tooltip } from "antd";
import { createStyles } from "antd-style";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function HeaderMenu() {
  const router = useRouter();
  const path = usePathname();
  const cart = useStore((state) => state.cart);
  const { toggleCart } = useCartContext();
  const { styles } = useStyles();

  const onClickHome = () => {
    router.push("/dashboard");
  };

  const onClickLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  const items: MenuProps["items"] = [
    // {
    //   label: "Home",
    //   key: "/dashboard",
    //   onClick: onClickHome,
    // },
    {
      key: "cart",
      onClick: toggleCart,
      icon: (
        <Tooltip title="Cart">
          <Badge count={cartSize(cart)} size="small">
            <ShoppingCartOutlined style={{ fontSize: "20px" }} />
          </Badge>
        </Tooltip>
      ),
    },
    {
      key: "logout",
      onClick: onClickLogout,
      icon: (
        <Tooltip title="Logout">
          <LogoutOutlined style={{ fontSize: "16px" }} />
        </Tooltip>
      ),
    },
  ];

  return (
    <Menu
      mode="horizontal"
      items={items}
      selectedKeys={[path]}
      className={styles.menu}
      theme="dark"
      inlineCollapsed={false}
    />
  );
}

const useStyles = createStyles(({ token, css }) => ({
  menu: css`
    background-color: ${token.colorBgElevated};
  `,
}));
