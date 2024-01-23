import { CartProduct } from "@/types/Cart";
import { calculateTaxAmount } from "./calculateTaxAmount";

export default function calculateProductTax(item: CartProduct) {
  return Object.values(item.taxes).reduce(
    (acc, curr) =>
      curr.isApplied
        ? acc + calculateTaxAmount(curr, item.price.amount * item.quantity)
        : acc,
    0
  );
}
