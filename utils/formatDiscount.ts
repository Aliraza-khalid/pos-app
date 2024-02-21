import { Discount } from "@/types/Discount";
import formatPrice from "./formatPrice";

export default function formatDiscount(discount: Discount): string {
  if (discount.discountType === "FIXED_AMOUNT")
    return `${discount.name} ($ ${formatPrice(discount.amountMoney.amount)})`;
  else return `${discount.name} (${discount.percentage} %)`;
}
