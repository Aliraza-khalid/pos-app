"use client";

import { Menu, MenuProps } from "antd";
import { createStyles } from "antd-style";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type PropTypes = {
  onClickCart: () => void;
};

export default function NavMenu({ onClickCart }: PropTypes) {
  const router = useRouter();
  const path = usePathname();
  const { styles } = useStyles();

  const onClickHome = () => {
    router.push("/dashboard");
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
    <Menu
      mode="horizontal"
      items={items}
      selectedKeys={[path]}
      className={styles.menu}
    />
  );
}

const useStyles = createStyles(({ token, css }) => ({
  menu: css`
    background-color: ${token.colorBgLayout};
  `,
}));
