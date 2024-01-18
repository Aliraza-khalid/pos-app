export default async function getLoginUrl(): Promise<string | null> {
  const res = await fetch("http://localhost:5000/api/login", {
    cache: "no-store",
  });
  const data = await res.json();

  if (data.success) return data.result.url;
  else return null;
}
