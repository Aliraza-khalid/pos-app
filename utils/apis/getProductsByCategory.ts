export default async function getProductsByCategory(categoryId: string) {
  const merchant = JSON.parse(localStorage.getItem('merchant') ?? '');
  const accessToken = JSON.parse(localStorage.getItem("accessToken") ?? '');

  const res = await fetch(
    `${process.env.SERVER_URL}/api/search-catalog-items?locationId=${merchant.mainLocationId}&categoryId=${categoryId}`,
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
  const { result } = await res.json();
  return result.items;
}
