export default async function getLoginUrl(): Promise<string> {
  const res = await fetch(`${process.env.SERVER_URL}/api/login`, {
    cache: "no-store",
  });
  const data = await res.json();
  if (data.success) return data.result.url;
  else throw new Error(data.message);
}
