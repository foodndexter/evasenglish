type Result = {
  request_cnt: number;
  match_cnt: number;
  status_code: "OK" | "BAD_JSON_REQUEST" | "";
  data: {
    b_no: string;
    b_stt: "계속사업자" | "" | "폐업자";
    b_stt_cd: "01" | "02" | "03" | "";
    tax_type: "부가가치세 면세사업자" | "";
    tax_type_cd: "01" | "02" | "03" | "04";
    end_dt: "";
    utcc_yn: "Y" | "N";
    tax_type_change_dt: string;
    invoice_apply_dt: string;
    rbf_tax_type: "해당없음" | "";
    rbf_tax_type_cd: "99" | "";
  }[];
};

export async function POST(req: Request) {
  const { regi } = await req.json();

  const url = process.env.REGI_URL!;
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ b_no: [regi] }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = (await res.json()) as Result;

  // console.log(data);
  if (data.status_code !== "OK") {
    return Response.json({ message: data.status_code }, { status: 403 });
  }

  return Response.json({ message: "testing validating" }, { status: 401 });
}
