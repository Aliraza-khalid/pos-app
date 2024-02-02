import calculateOrder from "@/services/calculateOrder";
import useStore from "@/stores";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import useNotificationContext from "../context/useNotificationContext";

export default function useOrderQuery() {
  useStore(state => state.cart);
  const orderDTO = useStore((state) => state.getOrderDTO)();
  const {showErrorNotification} = useNotificationContext();

  const query = useQuery({
    queryKey: ["calculateOrder", orderDTO],
    queryFn: () => calculateOrder(orderDTO),
  });

  useEffect(() => {
    query.error && showErrorNotification({
      description: query.error?.message
    })
  }, [query.error]);

  return query;
}
