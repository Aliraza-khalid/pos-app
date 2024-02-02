import { LoginData } from "@/types/Login";
import { APIResponse } from "@/types/Response";

export default async function getAccessToken(code: string): Promise<LoginData> {
  try {
    const res = await fetch(
      `${process.env.SERVER_URL}/api/access-token?code=${code}`,
      { cache: "no-store" }
    );
    const data: APIResponse<LoginData> = await res.json();
    if (data.success) return data.result;
    else throw new Error(data.message);
  } catch (error: any) {
    throw new Error(error?.message ?? error);
  }
}
