import { CreateOrderDTO, OrderResponseDTO } from "@/types/Order";

export default async function calculateOrder(
  dto: CreateOrderDTO
): Promise<OrderResponseDTO> {
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
  const data = await res.json();
  if(data.success) return data.result;
  throw new Error(data.message);
}
