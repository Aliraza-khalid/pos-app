import { Tax } from "@/types/Tax";

export function calculateTaxAmount(tax: Tax, price: number): number {
  if (tax.percentage) return (price * Number(tax.percentage)) / 100;
  else return Number(tax.amount);
}
