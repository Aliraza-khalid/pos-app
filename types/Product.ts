import { Money } from "./Order";

export type CatalogProduct = {
  catalogObjectId: string;
  name: string;
  variations: Variation[];
  imageUrl: string;
  incrementable: boolean;
  taxIds: string[];
};

export type Variation = {
  variationId: string;
  variant: string;
  price: Money;
  sku: string;
};
