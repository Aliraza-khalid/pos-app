import { Tax } from "@/types/Tax";

export function calculateTaxAmount(tax: Tax, price: number): number {
  return (price * Number(tax.percentage)) / 100;
}
