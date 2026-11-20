import { JusoResult } from "@/types/juso.types";
import { supabase } from "@/utils/supabase";

export async function POST(req: Request) {
  const { countPerPage, currentPage, keyword } = (await req.json()) as {
    keyword: string;
    currentPage: number;
    countPerPage: number;
  };
  const url =
    process.env.JUSO_URL! +
    `&keyword=${encodeURIComponent(keyword)}&currentPage=${currentPage ?? 1}&countPerPage=${countPerPage ?? 20}`;

  console.log(url);
  const res = await fetch(url);
  const { results } = (await res.json()) as JusoResult;
  if (
    results.common.errorCode !== "0" ||
    results.common.errorMessage !== "정상"
  )
    return Response.json({
      message: `Code:${results.common.errorCode}! ${results.common.errorMessage}`,
    });

  return Response.json(results);
}

export async function PATCH(req: Request) {
  const { data, error } = await supabase.from("users").select("*");

  console.log({ data, error });
  return Response.json({ message: "testing.." });
}
