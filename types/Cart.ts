import { CatalogProduct, Variation } from "./Product";
import { Tax } from "./Tax";

export interface CartProduct extends Variation {
  productId: string;
  name: string;
  imageUrl: string;
  quantity: number;
  taxes: {
    [key: string]: CartTax
  };
};

interface CartTax extends Tax {
  isApplied: boolean;
}
