import useStore from "@/stores";
import getTaxes from "@/utils/apis/getTaxes";
import { useQuery } from "@tanstack/react-query";
import React, { PropsWithChildren, useEffect } from "react";

export default function DashboardContainer({ children }: PropsWithChildren) {
  const setTaxes = useStore((state) => state.setTaxes);

  const { data } = useQuery({
    queryKey: ["taxes"],
    queryFn: () => getTaxes(),
  });

  useEffect(() => {
    data && setTaxes(data);
  }, [data]);

  return children;
}
