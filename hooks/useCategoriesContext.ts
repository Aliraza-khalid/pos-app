import { CategoriesContext } from '@/containers/CategoriesContainer';
import React, { useContext } from 'react'

export default function useCategoriesContext() {
  const context = useContext(CategoriesContext);

  if (!context) {
    throw new Error(
      "useCategoriesContext has to be used within <CategoriesContainer>"
    );
  }

  return context
}
