import QueryClientOptions from "@/constants/QueryClientOptions";
import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

const getQueryClient = cache(() => new QueryClient(QueryClientOptions));

export default getQueryClient;
