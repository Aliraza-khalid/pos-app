import { Drawer, Flex, Spin } from "antd";
import React from "react";
import CartFooter from "./CartFooter";
import CartCard from "./CartCard";
import ErrorMessage from "@/components/composite/ErrorMessage";
import { CalculateOrderResponse } from "@/types/Order";

type PropTypes = {
  open: boolean;
  close: () => void;
  content?: CalculateOrderResponse;
  loading: boolean;
  error: Error | null;
  retry?: () => void;
  children?: React.ReactNode;
  footer?: React.ReactNode;
};

export default function CartDrawer({
  open,
  close,
  content,
  loading,
  error,
  retry,
  children,
  footer
}: PropTypes) {
  return (
    <Drawer
      title="Cart"
      open={open}
      onClose={close}
      data-test={"cart-drawer"}
      footer={footer}
    >
      {content?.lineItems?.map((item) => (
        <CartCard key={item.catalogObjectId} item={item} loading={loading} />
      ))}

      {loading && (
        <Flex justify="center">
          <Spin size="large" style={{ marginBottom: 20 }} />
        </Flex>
      )}

      {error && (
        <Flex justify="center">
          <ErrorMessage message={error.message} onRetry={() => retry?.()} />
        </Flex>
      )}

      {children}
    </Drawer>
  );
}
