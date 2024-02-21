import { Cart } from "@/types/Cart";

export default function globalTaxes(cart: Cart): string[] {
  const arrays = Object.values(cart).map((item) => item.taxes);
  if (arrays.length === 0) return [];
  arrays.sort((a, b) => a.length - b.length);
  const result = arrays
    .shift()!
    .filter((v) => arrays.every((arr) => arr.includes(v)));
  return result;
}
