"use client";

import dynamic from "next/dynamic";
import { Col, Row } from "antd";
import { createStyles } from "antd-style";
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

  const { styles } = useStyles();

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
    <Row wrap={false}>
      <Col flex="250px" className={styles.categoriesCol}>
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

      <Col flex="auto">
        <ProductsList 
          productPages={productPages}
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

const useStyles = createStyles(({ token, css }) => ({
  categoriesCol: css`
    display: none;
    @media screen and (min-width: ${token.screenSM}px) {
      display: block;
    }
  `,
}));
