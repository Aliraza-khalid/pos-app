import { APIResponse } from "@/types/Response";

export default async function getLoginUrl(): Promise<string> {
  try {
    const res = await fetch(`${process.env.SERVER_URL}/api/login`, {
      cache: "no-store",
    });
    const data: APIResponse<{url: string}> = await res.json();
    if (data.success) return data.result.url;
    else throw new Error(data.error);
  } catch (error: any) {
    throw new Error(error?.message ?? error);
  }
}
