import useStore from "@/stores";
import getDiscounts from "@/utils/apis/getDiscounts";
import getTaxes from "@/utils/apis/getTaxes";
import { useQuery } from "@tanstack/react-query";
import React, { PropsWithChildren, useEffect } from "react";

export default function DashboardContainer({ children }: PropsWithChildren) {
  const setTaxes = useStore((state) => state.setTaxes);
  const setDiscounts = useStore((state) => state.setDiscounts);

  const { data: taxes } = useQuery({
    queryKey: ["taxes"],
    queryFn: () => getTaxes(),
  });

  const { data: discounts } = useQuery({
    queryKey: ["discounts"],
    queryFn: () => getDiscounts(),
  });

  useEffect(() => {
    taxes && setTaxes(taxes);
  }, [taxes]);

  useEffect(() => {
    discounts && setDiscounts(discounts);
  }, [discounts]);

  return children;
}
