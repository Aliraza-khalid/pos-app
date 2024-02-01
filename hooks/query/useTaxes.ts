import getTaxes from "@/services/getTaxes";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function useTaxes() {
  return useQuery({
    queryKey: ["taxes"],
    queryFn: getTaxes,
  });
}
