import useProductsQuery from "@/hooks/useProductsQuery";
import { createStyles } from "antd-style";
import Search from "antd/es/input/Search";
import React, { useEffect, useState } from "react";

export default function SearchBar() {
  const { searchQuery, searchByQuery } = useProductsQuery();
  const [query, setQuery] = useState(searchQuery);
  const { styles } = useStyles();

  const search = () => {
    searchByQuery(query);
  };

  useEffect(() => {
    const timeout = setTimeout(() => searchByQuery(query), 2000);

    return () => clearTimeout(timeout);
  }, [query, searchByQuery]);

  return (
    <Search
      name="search"
      value={query}
      placeholder="Search products"
      className={styles.searchBar}
      onChange={(v) => setQuery(v.target.value)}
      onSearch={search}
      enterButton
      allowClear
      data-test={"search-field"}
    />
  );
}

const useStyles = createStyles(({ token, css }) => ({
  searchBar: css`
    width: min(70%, ${token.screenXS}px);
  `,
}));
