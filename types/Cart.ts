import { Variation } from "./Product";
import { Tax } from "./Tax";

export type Cart = {
  [key: string]: CartProduct;
};

export interface CartProduct extends Variation {
  productId: string;
  name: string;
  imageUrl: string;
  quantity: number;
  taxes: string[];
  discounts: string[];
}

export interface CartTax extends Tax {
  isApplied: boolean;
}

export enum CartModalTypes {
  productTax = "ProductTax",
  productDiscount = "ProductDiscount",
  totalTax = "TotalTax",
  totalDiscount = "TotalDiscount",
  none = "",
}
