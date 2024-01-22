import useProductsContext from "@/context/useProductsContext";
import { createStyles } from "antd-style";
import Search from "antd/es/input/Search";
import React from "react";

export default function SearchBar() {
  const {searchQuery, setSearchQuery, search} = useProductsContext();
  const {styles} = useStyles();

  return (
    <Search
      value={searchQuery}
      placeholder="Search products"
      className={styles.searchBar}
      onChange={(v) => setSearchQuery(v.target.value)}
      onSearch={() => search()}
      enterButton
    />
  );
}

const useStyles = createStyles(({css}) => ({
  searchBar: css`
    width: min(70%, 400px);
  `,
}))
