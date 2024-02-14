"use client";

import Modal from "@/components/base/Modal";
import CategoriesCard from "@/components/categories/CategoriesCard";
import CategoriesList from "@/components/categories/CategoriesList";
import useCategoriesQuery from "@/hooks/useCategoriesQuery";
import useProductsQuery from "@/hooks/useProductsQuery";
import useStore from "@/stores";
import React from "react";

export default function CategoriesContainer() {
  const { categoryId, searchByCategory } = useProductsQuery();
  const { data: categories, isLoading, error, refetch } = useCategoriesQuery();

  const modalOpen = useStore((state) => state.categoriesModalOpen);
  const setModalOpen = useStore((state) => state.setCategoriesModalOpen);

  const renderList = () => (
    <CategoriesList
      categories={categories}
      loading={isLoading}
      error={error}
      retry={refetch}
      categoryId={categoryId}
      onClick={searchByCategory}
    />
  );

  return (
    <>
      <CategoriesCard>{renderList()}</CategoriesCard>

      <Modal
        title="Categories"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        {renderList()}
      </Modal>
    </>
  );
}
