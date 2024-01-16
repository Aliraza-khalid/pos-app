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
  price: Price;
  sku: string;
};

export type Price = {
  amount: number;
  currency: string;
};
