import { Tax } from "@/types/Tax";

export function calculateTaxAmount(tax: Tax, price: number) {
  if (tax.percentage) return price * Number(tax.percentage);
  else return Number(tax.amount);
}
