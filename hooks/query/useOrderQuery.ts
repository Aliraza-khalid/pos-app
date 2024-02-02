import calculateOrder from "@/services/calculateOrder";
import useStore from "@/stores";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function useOrderQuery() {
  const orderDTO = useStore((state) => state.getOrderDTO)();

  return useQuery({
    queryKey: ["calculateOrder", orderDTO],
    queryFn: () => calculateOrder(orderDTO),
  });
}
