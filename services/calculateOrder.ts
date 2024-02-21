import { CalculateOrderDTO, CalculateOrderResponse } from "@/types/Order";
import { APIResponse } from "@/types/Response";

export default async function calculateOrder(
  dto: CalculateOrderDTO
): Promise<CalculateOrderResponse> {
  try {
    const merchant = JSON.parse(localStorage.getItem("merchant") ?? "");

    const res = await fetch(`${process.env.SERVER_URL}/api/calculate-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.parse(localStorage.getItem("accessToken") ?? ""),
      },
      body: JSON.stringify({
        order: {
          ...dto,
          locationId: merchant.mainLocationId,
        },
      }),
    });
    const data: APIResponse<CalculateOrderResponse> = await res.json();
    if (data.success) return data.result;
    throw new Error(data.error);
  } catch (error: any) {
    throw new Error(error?.message ?? error);
  }
}
