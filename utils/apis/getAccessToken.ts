import { LoginData } from "@/types/Login";
import { APIResponse } from "@/types/Response";

export default async function getAccessToken(
  code: string
): Promise<LoginData | null> {
  const res = await fetch(
    `${process.env.SERVER_URL}/api/access-token?code=${code}`,
    { cache: "no-store" }
  );
  const data: APIResponse<LoginData> = await res.json();
  if (data.success) return data.result;
  else return null;
}
