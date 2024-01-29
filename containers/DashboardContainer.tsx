import React, { PropsWithChildren, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import useStore from "@/stores";
import getDiscounts from "@/utils/apis/getDiscounts";
import getTaxes from "@/utils/apis/getTaxes";
import isAuthenticated from "@/utils/isAuthenticated";
import CategoriesContainer from "./CategoriesContainer";
import ProductsContainer from "./ProductsContainer";
import CartContainer from "./CartContainer";

export default function DashboardContainer({ children }: PropsWithChildren) {
  const router = useRouter();

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

  useEffect(() => {
    !isAuthenticated() && router.replace("/login");
  }, []);

  return (
    <CategoriesContainer>
      <ProductsContainer>
        <CartContainer>{children}</CartContainer>
      </ProductsContainer>
    </CategoriesContainer>
  );
}
