import { z } from "zod";
export const jusoResultSchema = z.object({
  siNm: z.string(),
  lnbrMnnm: z.string(),
  bdKdcd: z.string(),
  jibunAddr: z.string(),
  buldSlno: z.string(),
  bdMgtSn: z.string(),
  zipNo: z.string(),
  roadAddr: z.string(),
  admCd: z.string(),
  liNm: z.string(),
  bdNm: z.string(),
  mtYn: z.string(),
  rnMgtSn: z.string(),
  roadAddrPart2: z.string(),
  sggNm: z.string(),
  buldMnnm: z.string(),
  roadAddrPart1: z.string(),
  emdNm: z.string(),
  lnbrSlno: z.string(),
  engAddr: z.string(),
  udrtYn: z.string(),
  rn: z.string(),
  detBdNmList: z.string(),
  emdNo: z.string(),
});
export type JusoResultProps = z.infer<typeof jusoResultSchema>;

export const jusoResultCommonSchema = z.object({
  countPerPage: z.string(),
  errorMessage: z.string(),
  errorCode: z.string(),
  totalCount: z.string(),
  currentPage: z.string(),
});

export type JusoResultCommon = z.infer<typeof jusoResultCommonSchema>;

export const getJusoResultCommon = (
  common: JusoResultCommon,
): {
  countPerPage: number;
  totalCount: number;
  currentPage: number;
} => ({
  countPerPage: parseInt(common.countPerPage),
  currentPage: parseInt(common.currentPage),
  totalCount: parseInt(common.totalCount),
});

export type JusoResult = {
  results: {
    common: JusoResultCommon;
    juso: JusoResultProps[];
  };
};

export const jusoSchema = jusoResultSchema
  .pick({
    siNm: true,
    jibunAddr: true,
    roadAddr: true,
    zipNo: true,
    sggNm: true,
    emdNm: true,
    liNm: true,
    bdMgtSn: true,
    rnMgtSn: true,
  })
  .extend({
    rest: z.string(),
  });
export type Juso = z.infer<typeof jusoSchema>;

export const filterJuso = ({
  siNm,
  jibunAddr,
  roadAddr,
  zipNo,
  sggNm,
  emdNm,
  liNm,
  bdMgtSn,
  rnMgtSn,
}: JusoResultProps): Juso => ({
  siNm,
  jibunAddr,
  roadAddr,
  zipNo,
  sggNm,
  emdNm,
  liNm,
  bdMgtSn,
  rnMgtSn,
  rest: "",
});
