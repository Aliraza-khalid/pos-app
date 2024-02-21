"use client";

import { usePathname, useRouter } from "next/navigation";
import { Badge, Menu, MenuProps, Space, Tooltip } from "antd";
import { LogoutOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import useStore from "@/stores";
import cartSize from "@/utils/cartSize";

export default function HeaderMenu() {
  const router = useRouter();
  const path = usePathname();
  const cart = useStore((state) => state.cart);
  const setCartOpen = useStore((state) => state.setCartOpen);

  const onClickCart = () => {
    setCartOpen(true);
  };

  const onClickLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  const items: MenuProps["items"] = [
    {
      key: "cart",
      onClick: onClickCart,
      icon: (
        <Tooltip title="Cart">
          <Badge count={cartSize(cart)} size="small" data-test={"cart-badge"}>
            <Space>
              <ShoppingCartOutlined style={{ fontSize: "22px" }} />
            </Space>
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
      style={{ backgroundColor: "transparent" }}
      theme="dark"
    />
  );
}
