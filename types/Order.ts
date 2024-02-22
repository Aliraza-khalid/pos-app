export interface CalculateOrderDTO {
  lineItems: CalculateOrderLineItem[];
  taxes: CalculateOrderTax[];
  discounts: CalculateOrderDiscount[];
}

export interface CalculateOrderLineItem {
  quantity: string;
  catalogObjectId: string;
  itemType: "ITEM";
  appliedTaxes: {
    taxUid: string;
  }[];
  appliedDiscounts: {
    discountUid: string;
  }[];
  pricingBlocklists?: {
    blockedDiscounts?: {
      discountCatalogObjectId: string;
    }[];
  };
}

export interface CalculateOrderTax {
  uid: string;
  catalogObjectId: string;
  scope: "ORDER" | "LINE_ITEM";
}

export type CalculateOrderDiscount = CalculateOrderTax;

export type CalculateOrderResponse = {
  locationId: string;
  lineItems?: LineItem[];
  taxes?: CalculateOrderResponseTax[];
  discounts?: CalculateOrderResponseDiscount[];
  netAmounts: NetAmounts;
  createdAt: Date;
  updatedAt: Date;
  state: string;
  version: number;
  totalMoney: Money;
  totalTaxMoney: Money;
  totalDiscountMoney: Money;
  totalTipMoney: Money;
  totalServiceChargeMoney: Money;
  netAmountDueMoney: Money;
};

export interface LineItem {
  uid: string;
  name: string;
  quantity: string;
  catalogObjectId: string;
  catalogVersion: number;
  variationName: string;
  itemType: string;
  appliedTaxes?: AppliedTax[];
  appliedDiscounts?: AppliedDiscount[];
  basePriceMoney: Money;
  variationTotalPriceMoney: Money;
  grossSalesMoney: Money;
  totalTaxMoney: Money;
  totalDiscountMoney: Money;
  totalMoney: Money;
  totalServiceChargeMoney: Money;
}

export type AppliedDiscount = {
  uid: string;
  discountUid: string;
  appliedMoney: Money;
};

export interface AppliedTax {
  uid: string;
  taxUid: string;
  appliedMoney: Money;
}

export interface Money {
  amount: number;
  currency: Currency;
}

export enum Currency {
  Usd = "USD",
}

export interface NetAmounts {
  totalMoney: Money;
  taxMoney: Money;
  discountMoney: Money;
  tipMoney: Money;
  serviceChargeMoney: Money;
}

export interface CalculateOrderResponseTax {
  uid: string;
  catalogObjectId: string;
  catalogVersion: number;
  name: string;
  type: string;
  percentage: string;
  appliedMoney: Money;
  scope: string;
}

export interface CalculateOrderResponseDiscount {
  uid: string;
  catalogObjectId: string;
  catalogVersion: number;
  name: string;
  type: string;
  pricingRuleId: string;
  appliedMoney: Money;
  scope: string;
}

export type GenerateOrderDTO = CalculateOrderDTO;

export interface GenerateOrderResponse {
  order: {
    id: string;
    customerId: string;
    referenceId: string;
    netAmount: Money;
  };
}
