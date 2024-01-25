import { Cart, CartTax } from "@/types/Cart";

export function filterAppliedTaxes (cart: Cart) {
  const appliedTaxes = Object.values(cart).reduce(
    (acc, item) => [...acc, ...item.taxes.filter((t) => t.isApplied)],
    [] as CartTax[]
  );

  const filtered = Array.from(
    new Map(appliedTaxes.map((t) => [t.id, t])).values()
  );

  return filtered;
}