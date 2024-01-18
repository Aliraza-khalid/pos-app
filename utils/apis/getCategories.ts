import { Category } from "@/types/Category";

export default async function getCategories(): Promise<Category[] | undefined> {
  const res = await fetch(`${process.env.SERVER_URL}/api/list-categories`, {
    headers: {
      Authorization: JSON.parse(localStorage.getItem("accessToken") ?? ""),
    },
  });
  const { result } = await res.json();
  return result;
}
