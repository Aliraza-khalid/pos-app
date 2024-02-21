import { Money } from "./Order";

export type Discount = PercentageDiscount | AmountDiscount;

export type PercentageDiscount = {
  id: string;
  name: string;
  discountType: "FIXED_PERCENTAGE";
  percentage: string;
}

export type AmountDiscount = {
  id: string;
  name: string;
  discountType: "FIXED_AMOUNT";
  amountMoney: Money;
}
