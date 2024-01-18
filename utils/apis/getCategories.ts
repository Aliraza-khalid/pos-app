export default async function getCategories() {
  const res = await fetch(`${process.env.SERVER_URL}/api/list-categories`, {
    headers: {
      Authorization: JSON.parse(localStorage.getItem("accessToken") ?? ""),
    },
  });
  const { result } = await res.json();
  return result;
};
