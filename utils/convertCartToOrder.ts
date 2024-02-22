import appliedTaxes from "./appliedTaxes";
import appliedDiscounts from "./appliedDiscounts";
import { Cart } from "@/types/Cart";
import { CalculateOrderDTO } from "@/types/Order";

export default function convertCartToOrder(cart: Cart): CalculateOrderDTO {
  return {
    lineItems: Object.values(cart).map((item) => ({
      catalogObjectId: item.variationId,
      quantity: item.quantity.toString(),
      itemType: "ITEM",
      appliedTaxes: item.taxes.map((tax) => ({ taxUid: tax })),
      appliedDiscounts: item.discounts.map((discount) => ({
        discountUid: discount,
      })),
      pricingBlocklists: {
        blockedDiscounts: item.blockedDiscounts?.map((id) => ({
          discountCatalogObjectId: id,
        })),
      },
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
