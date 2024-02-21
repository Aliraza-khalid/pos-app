import { Cart } from "@/types/Cart";

export default function cartSize(cart: Cart): number {
  return Object.values(cart).reduce((acc, curr) => acc + curr.quantity, 0);
}