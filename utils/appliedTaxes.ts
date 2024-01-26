import { Cart, CartTax } from "@/types/Cart";

export default function appliedTaxes (cart: Cart) {
  const applied = Object.values(cart).reduce(
    (acc, item) => [...acc, ...item.taxes.filter((t) => t.isApplied)],
    [] as CartTax[]
  );

  const filtered = Array.from(
    new Map(applied.map((t) => [t.id, t])).values()
  );

  return filtered;
}