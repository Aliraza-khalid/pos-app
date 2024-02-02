import appliedTaxes from "./appliedTaxes";
import appliedDiscounts from "./appliedDiscounts";
import { Cart } from "@/types/Cart";
import { CalculateOrderDTO } from "@/types/Order";

export function convertCartToOrder(cart: Cart): CalculateOrderDTO {
  return {
    lineItems: Object.values(cart).map((item) => ({
      catalogObjectId: item.variationId,
      quantity: item.quantity.toString(),
      itemType: "ITEM",
      appliedTaxes: item.taxes.map((tax) => ({ taxUid: tax })),
      appliedDiscounts: item.discounts.map((discount) => ({
        discountUid: discount,
      })),
    })),
    taxes: appliedTaxes(cart).map((tax) => ({
      uid: tax,
      catalogObjectId: tax,
      scope: "LINE_ITEM",
    })),
    discounts: appliedDiscounts(cart).map((discount) => ({
      uid: discount,
      catalogObjectId: discount,
      scope: "LINE_ITEM",
    })),
  };
}
