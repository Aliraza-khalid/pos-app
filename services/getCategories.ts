import { Category } from "@/types/Category";
import { APIResponse } from "@/types/Response";

export default async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${process.env.SERVER_URL}/api/list-categories`, {
      headers: {
        Authorization: JSON.parse(localStorage.getItem("accessToken") ?? ""),
      },
    });
    const data: APIResponse<Category[]> = await res.json();
    if (data.success) return data.result;
    else throw new Error(data.error);
  } catch (error: any) {
    throw new Error(error?.message ?? error);
  }
}
