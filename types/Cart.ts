import { CatalogProduct, Variation } from "./Product";
import { Tax } from "./Tax";

export type Cart = {
  [key: string]: CartProduct;
};

export interface CartProduct extends Variation {
  productId: string;
  name: string;
  imageUrl: string;
  quantity: number;
  taxes: CartTax[];
}

export interface CartTax extends Tax {
  isApplied: boolean;
}

export type CartModalTypes =
  | "ProductTax"
  | "ProductDiscount"
  | "TotalTax"
  | "TotalDiscount";
