import { Variation } from "./Product";

export type CartProduct = {
  catalogObjectId: string;
  name: string;
  variation: Variation;
  imageUrl: string;
  quantity: number;
  taxIds: string[];
};
