"use client";

import { createContext, PropsWithChildren } from "react";
import { notification } from "antd";
import { ArgsProps } from "antd/es/notification";

type ContextTypes = {
  showSuccessNotification: (props: NotificationProps) => void;
  showErrorNotification: (props: NotificationProps) => void;
};

type NotificationProps = Partial<ArgsProps>;

export const NotificationContext = createContext<ContextTypes | null>(null);

export default function NotificationProvider({ children }: PropsWithChildren) {
  const [api, contextHolder] = notification.useNotification();

  const showSuccessNotification = (props: NotificationProps) => {
    api.success({
      message: "Success",
      placement: "bottomLeft",
      ...props,
    });
  };

  const showErrorNotification = (props: NotificationProps) => {
    api.error({
      message: "Error",
      placement: "bottomLeft",
      ...props,
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        showSuccessNotification,
        showErrorNotification,
      }}
    >
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
}
