import environment from "@/constants/environment";

export default async function getCategories() {
  const res = await fetch(`${environment.server_url}/api/list-categories`, {
    headers: {
      Authorization: JSON.parse(localStorage.getItem("accessToken") ?? ""),
    },
  });
  const { result } = await res.json();
  return result;
};
