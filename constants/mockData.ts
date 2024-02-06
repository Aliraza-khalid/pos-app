import { CatalogProduct } from "../types/Product";

export const mockProduct: CatalogProduct = {
  catalogObjectId: "productId",
  name: "productName",
  variations: [
    {
      price: {
        amount: 1000,
        currency: "USD",
      },
      sku: "sku1",
      variationId: "variant1",
      variant: "variant1Name",
    },
    {
      price: {
        amount: 2000,
        currency: "USD",
      },
      sku: "sku2",
      variationId: "variant2",
      variant: "variant2Name",
    },
  ],
  imageUrl: "",
  taxIds: [],
  incrementable: true,
};
