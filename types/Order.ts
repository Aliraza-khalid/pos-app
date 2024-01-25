export interface CreateOrderDTO {
  lineItems: CreateOrderLineItem[];
  taxes: CreateOrderTax[];
  discounts: CreateOrderDiscount[];
}

export interface CreateOrderLineItem {
  quantity: string;
  catalogObjectId: string;
  itemType: "ITEM";
  appliedTaxes: {
    taxUid: string;
  }[];
  appliedDiscounts: {
    discountUid: string;
  }[];
}

export interface CreateOrderTax {
  uid: string;
  catalogObjectId: string;
  scope: "ORDER" | "LINE_ITEM";
}

export type CreateOrderDiscount = CreateOrderTax;

export type OrderResponseDTO = {
  locationId: string;
  lineItems?: LineItem[];
  taxes?: OrderResponseTax[];
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
  appliedTaxes: AppliedTax[];
  basePriceMoney: Money;
  variationTotalPriceMoney: Money;
  grossSalesMoney: Money;
  totalTaxMoney: Money;
  totalDiscountMoney: Money;
  totalMoney: Money;
  totalServiceChargeMoney: Money;
}

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

export interface OrderResponseTax {
  uid: string;
  catalogObjectId: string;
  catalogVersion: number;
  name: string;
  type: string;
  percentage: string;
  appliedMoney: Money;
  scope: string;
}
