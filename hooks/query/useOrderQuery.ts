import calculateOrder from "@/services/calculateOrder";
import useStore from "@/stores";
import { CreateOrderDTO } from "@/types/Order";
import { convertCartToOrder } from "@/utils/convertCartToOrder";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function useOrderQuery() {
  const cart = useStore((state) => state.cart);

  const orderDTO: CreateOrderDTO = convertCartToOrder(cart);

  return useQuery({
    queryKey: ["calculateOrder", orderDTO],
    queryFn: () => calculateOrder(orderDTO),
  });
}
