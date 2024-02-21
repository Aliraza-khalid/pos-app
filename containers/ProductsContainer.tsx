"use client";

import dynamic from "next/dynamic";
import { Col, Row } from "antd";
import { useTheme } from "antd-style";
import ProductsList from "@/components/products/ProductsList";
import CategoriesCard from "@/components/categories/CategoriesCard";
import CategoriesList from "@/components/categories/CategoriesList";
import useCategoriesQuery from "@/hooks/useCategoriesQuery";
import useProductsQuery from "@/hooks/useProductsQuery";
import useStore from "@/stores";

const Modal = dynamic(() => import("@/components/base/Modal"), { ssr: false });

export default function ProductsContainer() {
  const {
    productPages,
    isLoading: productsLoading,
    isLoadingPage: productsPageLoading,
    error: productsError,
    nextPage,
    search,
    categoryId,
    searchByCategory,
  } = useProductsQuery();
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: CategoriesError,
    refetch,
  } = useCategoriesQuery();

  const modalOpen = useStore((state) => state.categoriesModalOpen);
  const setModalOpen = useStore((state) => state.setCategoriesModalOpen);

  const theme = useTheme();

  const products = productPages?.flatMap((e) => e.items);

  const Categories = () => (
    <CategoriesList
      categories={categories}
      loading={categoriesLoading}
      error={CategoriesError}
      retry={refetch}
      categoryId={categoryId}
      onClick={searchByCategory}
    />
  );

  return (
    <Row wrap={false} gutter={theme.marginXL}>
      <Col span={0} lg={{ span: 5 }} className={"gutter-row"}>
        <CategoriesCard>
          <Categories />
        </CategoriesCard>

        <Modal
          title="Categories"
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        >
          <Categories />
        </Modal>
      </Col>

      <Col flex="auto" className="gutter-row">
        <ProductsList
          products={products}
          loading={productsLoading}
          pageLoading={productsPageLoading}
          error={productsError}
          nextPage={nextPage}
          retry={search}
        />
      </Col>
    </Row>
  );
}
