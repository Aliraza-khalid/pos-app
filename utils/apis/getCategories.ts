import { Environment } from "@/constants/Environment";

export default async function GetCategories() {
  const res = await fetch(`${Environment.server_url}/api/list-categories`, {
    headers: {
      Authorization: JSON.parse(localStorage.getItem("accessToken") ?? ""),
    },
  });
  const { result } = await res.json();
  return result;
};
