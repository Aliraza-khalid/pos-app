import { Category } from "@/types/Category";

export default async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${process.env.SERVER_URL}/api/list-categories`, {
      headers: {
        Authorization: JSON.parse(localStorage.getItem("accessToken") ?? ""),
      },
    });
    const data = await res.json();
    if (data.success) return data.result;
    else throw new Error(data.message);
  } catch (error: any) {
    throw new Error(error?.message ?? error);
  }
}
