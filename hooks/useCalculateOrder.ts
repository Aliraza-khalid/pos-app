import calculateOrder from "@/services/calculateOrder";
import useStore from "@/stores";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import useNotificationContext from "./useNotificationContext";
import * as Sentry from "@sentry/nextjs";

export default function useOrderQuery() {
  useStore((state) => state.cart);
  const orderDTO = useStore((state) => state.getOrderDTO)();
  const { showErrorNotification } = useNotificationContext();

  const query = useQuery({
    queryKey: ["calculateOrder", orderDTO],
    queryFn: () => calculateOrder(orderDTO),
  });
  const { error } = query;

  useEffect(() => {
    if (!error) return;
    Sentry.captureException(error);
    showErrorNotification({
      message: "Cart Error",
      description: error?.message,
    });
  }, [error, showErrorNotification]);

  return query;
}
