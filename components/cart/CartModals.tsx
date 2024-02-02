import React from "react";
import { Flex, Select, Switch } from "antd";
import Modal from "@/components/base/Modal";
import Text from "@/components/base/Text";
import useStore from "@/stores";
import useCart from "@/hooks/useCart";
import useTaxesQuery from "@/hooks/query/useTaxesQuery";
import useDiscountsQuery from "@/hooks/query/useDiscountsQuery";
import appliedDiscounts from "@/utils/appliedDiscounts";
import formatDiscount from "@/utils/formatDiscount";
import formatTax from "@/utils/formatTax";
import globalTaxes from "@/utils/globalTaxes";

export default function CartModals() {
  const cart = useStore((state) => state.cart);
  const cartModal = useStore((state) => state.cartModal);
  const activeProduct = useStore((state) => state.getActiveProduct)();
  const toggleCartModal = useStore((state) => state.toggleCartModal);

  const { data: taxes } = useTaxesQuery();
  const { data: discounts } = useDiscountsQuery();
  const nonAmountDiscounts = discounts?.filter(d => d.discountType !== 'FIXED_AMOUNT');

  const { updateDiscounts, toggleTax, updateGlobalDiscounts, toggleGlobalTax } =
    useCart();

  const productDiscounts = nonAmountDiscounts?.reduce((acc, curr) => activeProduct?.discounts.includes(curr.id) ? [...acc, curr.id] : acc, [] as string[]);
  const allTaxes = globalTaxes(cart);
  const allAppliedDiscounts = appliedDiscounts(cart);

  return (
    <>
      <Modal
        title={`Discounts - ${activeProduct?.name}`}
        open={cartModal === "ProductDiscount"}
        onClose={() => toggleCartModal("ProductDiscount")}
      >
        <Select
          mode="multiple"
          allowClear
          placeholder="Select Discounts"
          value={productDiscounts}
          onChange={updateDiscounts}
          options={nonAmountDiscounts?.map((discount) => ({
            label: formatDiscount(discount),
            value: discount.id,
          }))}
        />
      </Modal>

      <Modal
        title={`Taxes - ${activeProduct?.name}`}
        open={cartModal === "ProductTax"}
        onClose={() => toggleCartModal("ProductTax")}
      >
        {taxes?.map((tax) => (
          <Flex key={tax.id} justify="space-between">
            <Text title={formatTax(tax)} />
            <Switch
              value={activeProduct?.taxes.includes(tax.id)}
              onChange={(v) => toggleTax(tax.id, v)}
            />
          </Flex>
        ))}
      </Modal>

      <Modal
        title="All Discounts"
        open={cartModal === "TotalDiscount"}
        onClose={() => toggleCartModal("TotalDiscount")}
      >
        <Select
          mode="multiple"
          placeholder="Select Discounts"
          value={allAppliedDiscounts}
          onChange={updateGlobalDiscounts}
          options={discounts?.map((discount) => ({
            label: formatDiscount(discount),
            value: discount.id,
          }))}
        />
      </Modal>

      <Modal
        title="Taxes - Applied Globally"
        open={cartModal === "TotalTax"}
        onClose={() => toggleCartModal("TotalTax")}
      >
        {taxes?.map((tax) => (
          <Flex key={tax.id} justify="space-between">
            <Text title={formatTax(tax)} />
            <Switch
              value={allTaxes.includes(tax.id)}
              onChange={(v) => toggleGlobalTax(tax.id, v)}
            />
          </Flex>
        ))}
      </Modal>
    </>
  );
}
