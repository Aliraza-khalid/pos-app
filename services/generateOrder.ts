import {
  GenerateOrderDTO,
  GenerateOrderResponse,
} from "@/types/Order";
import { APIResponse } from "@/types/Response";

export default async function generateOrder(
  dto: GenerateOrderDTO
): Promise<GenerateOrderResponse> {
  try {
    const merchant = JSON.parse(localStorage.getItem("merchant") ?? "");

    const res = await fetch(`${process.env.SERVER_URL}/api/generate-order`, {
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
        customer: {
          VIN: "",
        },
      }),
    });
    const data: APIResponse<GenerateOrderResponse> = await res.json();
    if (data.success) return data.result;
    throw new Error(data.error);
  } catch (error: any) {
    throw new Error(error?.message ?? error);
  }
}
