import { Cart } from "@/types/Cart";

export default function appliedTaxes(cart: Cart) {
  const applied = Object.values(cart).flatMap((item) => item.taxes);

  const filtered = Array.from(new Set(applied));

  return filtered;
}
