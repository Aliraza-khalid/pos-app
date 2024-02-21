import { Discount } from "@/types/Discount";
import { APIResponse } from "@/types/Response";

export default async function getDiscounts(): Promise<Discount[]> {
  try {
    const merchant = JSON.parse(localStorage.getItem("merchant") ?? "");

    const res = await fetch(
      `${process.env.SERVER_URL}/api/get-discounts?type=DISCOUNT&locationId=${merchant.mainLocationId}`,
      {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("accessToken") ?? ""),
        },
      }
    );
    const data: APIResponse<Discount[]> = await res.json();
    if (data.success) return data.result;
    else throw new Error(data.error);
  } catch (error: any) {
    throw new Error(error?.message ?? error);
  }
}
