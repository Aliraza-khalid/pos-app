import { Currency, LineItem } from "@/types/Order";
import { CatalogProduct } from "../types/Product";
import { Cart } from "@/types/Cart";

export const mockProduct: CatalogProduct = {
  catalogObjectId: "JZQI625LSYE527OIOIZ4OF2U",
  name: "Chicken Grill Burger",
  variations: [
    {
      variationId: "SXAKBHOYZR73R42G2PASM5SQ",
      variant: "Regular",
      price: {
        amount: 500,
        currency: Currency.Usd,
      },
      sku: "B01",
    },
    {
      variationId: "IBBAHHNOQWOGJQNRZE35WRRT",
      variant: "Large",
      price: {
        amount: 600,
        currency: Currency.Usd,
      },
      sku: "B11",
    },
  ],
  imageUrl: "",
  incrementable: true,
  taxIds: ["CSFVL32OZIG73WPX52NQBF5H"],
};

export const mockLineItem: LineItem = {
  uid: "a1tihCh1n1Is3FCxivOPNC",
  name: "Chicken Grill Burger",
  quantity: "3",
  catalogObjectId: "SXAKBHOYZR73R42G2PASM5SQ",
  catalogVersion: 1706278679070,
  variationName: "Regular",
  itemType: "ITEM",
  appliedTaxes: [
    {
      uid: "mxWEOFznmjVctu0vrJpF5B",
      taxUid: "CSFVL32OZIG73WPX52NQBF5H",
      appliedMoney: {
        amount: 285,
        currency: Currency.Usd,
      },
    },
  ],
  basePriceMoney: {
    amount: 500,
    currency: Currency.Usd,
  },
  variationTotalPriceMoney: {
    amount: 1500,
    currency: Currency.Usd,
  },
  grossSalesMoney: {
    amount: 1500,
    currency: Currency.Usd,
  },
  totalTaxMoney: {
    amount: 285,
    currency: Currency.Usd,
  },
  totalDiscountMoney: {
    amount: 0,
    currency: Currency.Usd,
  },
  totalMoney: {
    amount: 1785,
    currency: Currency.Usd,
  },
  totalServiceChargeMoney: {
    amount: 0,
    currency: Currency.Usd,
  },
};
