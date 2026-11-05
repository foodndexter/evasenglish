import { JusoResult } from "@/types/juso.types";

export async function POST(req: Request) {
  const { countPerPage, currentPage, keyword } = (await req.json()) as {
    keyword: string;
    currentPage: number;
    countPerPage: number;
  };
  console.log(countPerPage, currentPage, keyword);
  const url =
    process.env.JUSO_URL! +
    `&keyword=${keyword}&currentPage=${currentPage ?? 1}&countPerPage=${countPerPage ?? 20}`;

  //   console.log(url);
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
