import environment from "@/constants/environment";

export default async function searchProducts(
  query: string,
  categoryId: string
) {
  const merchant = JSON.parse(localStorage.getItem("merchant") ?? "");
  const accessToken = JSON.parse(localStorage.getItem("accessToken") ?? "");

  const res = await fetch(
    `${environment.server_url}/api/search-catalog-items?locationId=${merchant.mainLocationId}&categoryId=${categoryId}&textFilter=${query}`,
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
  const { result } = await res.json();
  return result.items;
}
