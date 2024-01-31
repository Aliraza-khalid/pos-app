import getDiscounts from "@/utils/apis/getDiscounts";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function useDiscounts() {
  return useQuery({
    queryKey: ["discounts"],
    queryFn: getDiscounts,
  });
}
