export default async function getLoginUrl(): Promise<string | null> {
  const res = await fetch(`${process.env.SERVER_URL}/api/login`, {
    cache: "no-store",
  });
  const data = await res.json();

  if (data.success) return data.result.url;
  else return null;
}
