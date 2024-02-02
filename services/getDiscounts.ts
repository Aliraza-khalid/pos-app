import { Discount } from "@/types/Discount";

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
    const data = await res.json();
    if (data.success) return data.result;
    else throw new Error(data.message);
  } catch (error: any) {
    throw new Error(error?.message ?? error);
  }
}
