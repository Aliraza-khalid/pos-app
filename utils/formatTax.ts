import { Tax } from "@/types/Tax";

export default function formatTax (tax: Tax): string {
  if(tax.percentage) return `${tax.percentage} %`;
  else if(tax.amount) return `$ ${tax.amount}`
  else return ''
}