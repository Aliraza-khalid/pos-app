import { Tax } from "@/types/Tax";

export default function formatTax(tax: Tax): string {
  return `${tax.name} (${tax.percentage} %)`;
}
