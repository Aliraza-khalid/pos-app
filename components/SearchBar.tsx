import useProductsQuery from "@/hooks/useProductsQuery";
import { createStyles } from "antd-style";
import Search from "antd/es/input/Search";
import React, { useState } from "react";

export default function SearchBar() {
  const { searchQuery, searchByQuery } = useProductsQuery();
  const [query, setQuery] = useState(searchQuery);
  const { styles } = useStyles();

  const onSearch = () => {
    searchByQuery(query);
  };

  return (
    <Search
      name="search"
      value={query}
      placeholder="Search products"
      className={styles.searchBar}
      onChange={(v) => setQuery(v.target.value)}
      onSearch={onSearch}
      enterButton
      data-test={"search-field"}
    />
  );
}

const useStyles = createStyles(({ token, css }) => ({
  searchBar: css`
    width: min(70%, ${token.screenXS}px);
  `,
}));
