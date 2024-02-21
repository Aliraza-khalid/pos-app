import { APIResponse } from "@/types/Response";
import { Tax } from "@/types/Tax";

export default async function getTaxes(): Promise<Tax[]> {
  try {
    const merchant = JSON.parse(localStorage.getItem("merchant") ?? "");

    const res = await fetch(
      `${process.env.SERVER_URL}/api/get-tax?type=TAX&locationId=${merchant.mainLocationId}`,
      {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("accessToken") ?? ""),
        },
      }
    );
    const data: APIResponse<Tax[]> = await res.json();
    if (data.success) return data.result;
    else throw new Error(data.error);
  } catch (error: any) {
    throw new Error(error?.message ?? error);
  }
}
