import { QueryClientConfig } from "@tanstack/react-query";

export const QueryClientOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 10000,
    },
    mutations: {
      retry: false,
    },
  },
};

export default QueryClientOptions;
