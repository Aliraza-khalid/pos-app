export default async function GetAccessToken(code: string) {
  const res = await fetch(
    `http://localhost:5000/api/access-token?code=${code}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  if (data.success) return data.result;
  else return null;
}
