import generateOrder from "@/services/generateOrder";
import { GenerateOrderDTO } from "@/types/Order";
import { useMutation } from "@tanstack/react-query";
import React from "react";

export default function useOrderMutation() {
  return useMutation({
    mutationFn: (dto: GenerateOrderDTO) => generateOrder(dto),
  });
}
