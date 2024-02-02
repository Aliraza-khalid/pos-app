import { APIResponse } from "@/types/Response";
import { SearchProductsData } from "@/types/Search";

export default async function searchProducts(
  query: string,
  categoryId: string,
  cursor?: string
): Promise<SearchProductsData> {
  try {
    const merchant = JSON.parse(localStorage.getItem("merchant") ?? "");
    const accessToken = JSON.parse(localStorage.getItem("accessToken") ?? "");

    const res = await fetch(
      `${process.env.SERVER_URL}/api/search-catalog-items?locationId=${merchant.mainLocationId}&categoryId=${categoryId}&textFilter=${query}&cursor=${cursor}`,
      {
        headers: {
          Authorization: accessToken,
        },
      }
    );
    const data: APIResponse<SearchProductsData> = await res.json();
    if (data.success) return data.result;
    else throw new Error(data.message);
  } catch (error: any) {
    throw new Error(error?.message ?? error);
  }
}
