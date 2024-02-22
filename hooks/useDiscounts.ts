import React from "react";
import useOrderQuery from "./useCalculateOrder";
import useStore from "@/stores";
import useDiscountsQuery from "./useDiscountsQuery";

export default function useDiscounts() {
  const { data: order } = useOrderQuery();
  const activeProduct = useStore((state) => state.getActiveProduct)();
  const { data: discounts } = useDiscountsQuery();

  const itemDiscounts = () => {
    const lineItem = order?.lineItems?.find(
      (obj) => obj.catalogObjectId === activeProduct?.variationId
    );

    const appliedUids = lineItem?.appliedDiscounts?.map((d) => d.discountUid);

    const appliedIds = order?.discounts?.reduce(
      (acc, curr) =>
        appliedUids?.includes(curr.uid) ? [...acc, curr.catalogObjectId] : acc,
      [] as String[]
    );

    const appliedDiscounts = discounts
      ?.filter((d) => appliedIds?.includes(d.id))
      .map((d) => d.id);

    return appliedDiscounts ?? [];
  };

  const itemDiscountsOptions = () => {
    const appliedIds = itemDiscounts();
    return discounts?.filter(
      (d) => d.discountType !== "FIXED_AMOUNT" || appliedIds.includes(d.id)
    );
  };

  return {
    itemDiscounts,
    itemDiscountsOptions,
  };
}
