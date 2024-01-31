import React from "react";
import Modal from "../base/Modal";
import { Select } from "antd";
import useStore from "@/stores";
import appliedTaxes from "@/utils/appliedTaxes";
import appliedDiscounts from "@/utils/appliedDiscounts";
import useCart from "@/hooks/useCart";
import useCartContext from "@/hooks/useCartContext";
import formatDiscount from "@/utils/formatDiscount";
import formatTax from "@/utils/formatTax";
import useTaxes from "@/hooks/query/useTaxes";
import useDiscounts from "@/hooks/query/useDiscounts";

export default function CartModals() {
  const cart = useStore((state) => state.cart);
  const { data: taxes } = useTaxes();
  const { data: discounts } = useDiscounts();

  const {
    updateDiscounts,
    updateTaxes,
    updateGlobalDiscounts,
    updateGlobalTaxes,
  } = useCart();
  const { cartModal, modalData, toggleModal } = useCartContext();

  const allAppliedTaxes = appliedTaxes(cart);
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
          value={modalData?.discounts}
          onChange={updateDiscounts}
          options={discounts?.map((discount) => ({
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
        <Select
          mode="multiple"
          allowClear
          placeholder="Select Taxes"
          value={modalData?.taxes}
          onChange={updateTaxes}
          options={taxes?.map((tax) => ({
            label: formatTax(tax),
            value: tax.id,
          }))}
        />
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
        title="All Taxes"
        open={cartModal === "TotalTax"}
        onClose={() => toggleModal("TotalTax")}
      >
        <Select
          mode="multiple"
          placeholder="Select Taxes"
          value={allAppliedTaxes}
          onChange={updateGlobalTaxes}
          options={taxes?.map((tax) => ({
            label: formatTax(tax),
            value: tax.id,
          }))}
        />
      </Modal>
    </>
  );
}
