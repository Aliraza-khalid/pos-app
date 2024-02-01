import React from "react";
import { Flex, Select, Switch } from "antd";
import Modal from "@/components/base/Modal";
import Text from "@/components/base/Text";
import useStore from "@/stores";
import useCart from "@/hooks/useCart";
import useCartContext from "@/hooks/context/useCartContext";
import useTaxes from "@/hooks/query/useTaxes";
import useDiscounts from "@/hooks/query/useDiscounts";
import appliedDiscounts from "@/utils/appliedDiscounts";
import formatDiscount from "@/utils/formatDiscount";
import formatTax from "@/utils/formatTax";
import globalTaxes from "@/utils/globalTaxes";

export default function CartModals() {
  const cart = useStore((state) => state.cart);
  const { data: taxes } = useTaxes();
  const { data: discounts } = useDiscounts();
  const nonAmountDiscounts = discounts?.filter(d => d.discountType !== 'FIXED_AMOUNT');

  const { updateDiscounts, toggleTax, updateGlobalDiscounts, toggleGlobalTax } =
    useCart();
  const { cartModal, modalData, toggleModal } = useCartContext();

  const productDiscounts = nonAmountDiscounts?.reduce((acc, curr) => modalData?.discounts.includes(curr.id) ? [...acc, curr.id] : acc, [] as string[]);
  const allTaxes = globalTaxes(cart);
  const allAppliedDiscounts = appliedDiscounts(cart);

  return (
    <>
      <Modal
        title={`Discounts - ${modalData?.name}`}
        open={cartModal === "ProductDiscount"}
        onClose={() => toggleModal("ProductDiscount")}
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
        title={`Taxes - ${modalData?.name}`}
        open={cartModal === "ProductTax"}
        onClose={() => toggleModal("ProductTax")}
      >
        {taxes?.map((tax) => (
          <Flex key={tax.id} justify="space-between">
            <Text title={formatTax(tax)} />
            <Switch
              value={modalData?.taxes.includes(tax.id)}
              onChange={(v) => toggleTax(tax.id, v)}
            />
          </Flex>
        ))}
      </Modal>

      <Modal
        title="All Discounts"
        open={cartModal === "TotalDiscount"}
        onClose={() => toggleModal("TotalDiscount")}
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
        onClose={() => toggleModal("TotalTax")}
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
