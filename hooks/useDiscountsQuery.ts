import getDiscounts from "@/services/getDiscounts";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function useDiscountsQuery() {
  return useQuery({
    queryKey: ["discounts"],
    queryFn: getDiscounts,
  });
}
