import { NotificationContext } from "@/providers/NotificationProvider";
import React, { useContext } from "react";

export default function useNotificationContext() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotificationContext has to be used within <NotificationProvider>"
    );
  }

  return context;
}
