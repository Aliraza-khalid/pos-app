import React from "react";
import { Flex, Select, Switch } from "antd";
import Modal from "@/components/base/Modal";
import Text from "@/components/base/Text";
import useStore from "@/stores";
import useCart from "@/hooks/useCart";
import useTaxesQuery from "@/hooks/useTaxesQuery";
import useDiscountsQuery from "@/hooks/useDiscountsQuery";
import appliedDiscounts from "@/utils/appliedDiscounts";
import formatDiscount from "@/utils/formatDiscount";
import formatTax from "@/utils/formatTax";
import globalTaxes from "@/utils/globalTaxes";
import { CartModalTypes } from "@/types/Cart";
import useDiscounts from "@/hooks/useDiscounts";

export default function CartModalsContainer() {
  const cart = useStore((state) => state.cart);
  const cartModal = useStore((state) => state.cartModal);
  const activeProduct = useStore((state) => state.getActiveProduct)();
  const toggleCartModal = useStore((state) => state.toggleCartModal);

  const { data: taxes } = useTaxesQuery();
  const { data: discounts } = useDiscountsQuery();
  const { itemDiscounts, itemDiscountsOptions } = useDiscounts();

  const {
    addDiscount,
    removeDiscount,
    toggleTax,
    updateGlobalDiscounts,
    toggleGlobalTax,
  } = useCart();

  const itemAppliedDiscounts = itemDiscounts();
  const orderTaxes = globalTaxes(cart);
  const allAppliedDiscounts = appliedDiscounts(cart);

  return (
    <>
      <Modal
        title={`Discounts - ${activeProduct?.name}`}
        open={cartModal === "ProductDiscount"}
        onClose={() => toggleCartModal(CartModalTypes.productDiscount)}
      >
        <Select
          mode="multiple"
          allowClear
          placeholder="Select Discounts"
          value={itemAppliedDiscounts}
          onDeselect={removeDiscount}
          onSelect={addDiscount}
          options={itemDiscountsOptions()?.map((discount) => ({
            label: formatDiscount(discount),
            value: discount.id,
          }))}
        />
      </Modal>

      <Modal
        title={`Taxes - ${activeProduct?.name}`}
        open={cartModal === "ProductTax"}
        onClose={() => toggleCartModal(CartModalTypes.productTax)}
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
        onClose={() => toggleCartModal(CartModalTypes.totalDiscount)}
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
        onClose={() => toggleCartModal(CartModalTypes.totalTax)}
      >
        {taxes?.map((tax) => (
          <Flex key={tax.id} justify="space-between">
            <Text title={formatTax(tax)} />
            <Switch
              value={orderTaxes.includes(tax.id)}
              onChange={(v) => toggleGlobalTax(tax.id, v)}
            />
          </Flex>
        ))}
      </Modal>
    </>
  );
}
