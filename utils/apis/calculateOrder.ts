import { CreateOrderDTO, OrderResponseDTO } from "@/types/Order";

export default async function calculateOrder(
  data: CreateOrderDTO
): Promise<OrderResponseDTO | undefined> {
  const merchant = JSON.parse(localStorage.getItem("merchant") ?? "");

  const res = await fetch(`${process.env.SERVER_URL}/api/calculate-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("accessToken") ?? ""),
    },
    body: JSON.stringify({
      order: {
        ...data,
        locationId: merchant.mainLocationId,
      },
    }),
  });
  const { result } = await res.json();
  return result;
}
