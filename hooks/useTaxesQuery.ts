import getTaxes from "@/services/getTaxes";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function useTaxesQuery() {
  return useQuery({
    queryKey: ["taxes"],
    queryFn: getTaxes,
  });
}
