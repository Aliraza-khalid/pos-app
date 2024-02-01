import { Cart } from "@/types/Cart";

export default function appliedDiscounts(cart: Cart): string[] {
  const applied = Object.values(cart).flatMap((item) => item.discounts);

  const filtered = Array.from(new Set(applied));

  return filtered;
}
