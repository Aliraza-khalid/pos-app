import { CatalogProduct } from "./Product";

export type SearchProductsData = {
  cursor: string;
  items: CatalogProduct[];
};
