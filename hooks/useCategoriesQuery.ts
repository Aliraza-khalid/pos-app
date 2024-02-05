import getCategories from "@/services/getCategories";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function useCategoriesQuery() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}
