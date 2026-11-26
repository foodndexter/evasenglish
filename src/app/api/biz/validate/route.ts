export async function POST(req: Request) {
  const {} = await req.json();

  const payload = { b_no: ["612-94-22897"] };

  const url = process.env.REGI_URL!;
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  const data = await res.json();

  console.log(data, res, url);

  return Response.json({ message: "testing validating" }, { status: 401 });
}
