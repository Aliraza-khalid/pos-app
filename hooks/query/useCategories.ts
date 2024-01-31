import getCategories from "@/utils/apis/getCategories";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}
