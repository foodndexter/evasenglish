import { randomImg01, randomImg02, randomImg03, randomImg04, randomImg05, randomImg06, randomImg07, randomImg08, randomImg09, randomImg10 } from "./imgs"

export const dexyRGB = {
  black: "67,67,67",
  white: "255, 255, 255",
  red: "255, 108, 108",
  orange: "255, 193, 108",
  yellow: "252, 247, 247",
  green: "163, 226, 155",
  blue: "108, 193, 255",
  navy: "40, 61, 177",
  purple: "201, 159, 250",
}

export const srcs: VimeoSrc[] = [275602204, 66140585, 287903693, 282059182, 284319225, 301760075, 301767975, 296795894]

export const dexyFonts = {
  notoSansKor: `'Noto Sans KR', sans-serif`,
}

const engNEKim: Lecture[] = [
  {
    name: "The Part You Play",
    title: "The Final Touchdown",
    amount: 3,
    sort: "고등내신",
    category: "영어",
    book: "능률김성곤",
    chapter: "1과",
    price: 10000,
    id: 1,
    src: [
      { lec: "1강", src: 275602204 },
      { lec: "2강", src: 282059182 },
      { lec: "3강", src: 284319225 },
    ],
    img: randomImg01,
  },
  {
    name: "The Power of Creativity",
    title: "FROM TRASH TO TREASURE",
    amount: 3,
    sort: "고등내신",
    category: "영어",
    book: "능률김성곤",
    chapter: "2과",
    price: 10000,
    src: [
      { lec: "1강", src: 275602204 },
      { lec: "2강", src: 282059182 },
      { lec: "3강", src: 284319225 },
    ],
    id: 2,
    img: randomImg01,
  },
  {
    name: "Sound Life",
    title: "Art Heals",
    amount: 3,
    sort: "고등내신",
    category: "영어",
    book: "능률김성곤",
    chapter: "3과",
    price: 10000,
    src: [
      { lec: "1강", src: 275602204 },
      { lec: "2강", src: 282059182 },
      { lec: "3강", src: 284319225 },
    ],
    id: 3,
    img: randomImg01,
  },
  {
    name: "Toward a Better World",
    title: "Put a Roof over Someone's Head",
    amount: 3,
    sort: "고등내신",
    category: "영어",
    book: "능률김성곤",
    chapter: "4과",
    price: 10000,
    src: [
      { lec: "1강", src: 275602204 },
      { lec: "2강", src: 282059182 },
      { lec: "3강", src: 284319225 },
    ],
    id: 4,
    img: randomImg01,
  },
  {
    name: "What Matters Most",
    title: "Three Questions",
    amount: 3,
    sort: "고등내신",
    category: "영어",
    book: "능률김성곤",
    chapter: "5과",
    price: 10000,
    src: [
      { lec: "1강", src: 275602204 },
      { lec: "2강", src: 282059182 },
      { lec: "3강", src: 284319225 },
    ],
    id: 5,
    img: randomImg01,
  },
  {
    name: "Beyond the Limits",
    title: "Against All Odds",
    amount: 3,
    sort: "고등내신",
    category: "영어",
    book: "능률김성곤",
    chapter: "6과",
    price: 10000,
    src: [
      { lec: "1강", src: 275602204 },
      { lec: "2강", src: 282059182 },
      { lec: "3강", src: 284319225 },
    ],
    id: 6,
    img: randomImg01,
  },
  {
    name: "Finding Out the Wonders",
    title: "Hanji, Korea's Paper",
    amount: 3,
    sort: "고등내신",
    category: "영어",
    book: "능률김성곤",
    chapter: "7과",
    price: 10000,
    src: [
      { lec: "1강", src: 275602204 },
      { lec: "2강", src: 282059182 },
      { lec: "3강", src: 284319225 },
    ],
    id: 7,
    img: randomImg01,
  },
  {
    name: "It's Up to You!",
    title: "How Teens Make Decisions",
    amount: 3,
    sort: "고등내신",
    category: "영어",
    book: "능률김성곤",
    chapter: "8과",
    price: 10000,
    src: [
      { lec: "1강", src: 275602204 },
      { lec: "2강", src: 282059182 },
      { lec: "3강", src: 284319225 },
    ],
    id: 8,
    img: randomImg01,
  },
]

export const dexyLectures: Lecture[] = [...engNEKim]

export const dexyBanner: Banner[] = [
  { name: "고등내신", img: randomImg02, path: "gdns", text: "기초탄탄 내신탄탄" },
  { name: "모의고사", img: randomImg03, path: "megs", text: "연습조차 실전처럼" },
  { name: "수능특강", img: randomImg04, path: "sntg", text: "인생역전 건곤일검" },
  { name: "필수문법", img: randomImg05, path: "psmb", text: "기초공사 바닥부터" },
  { name: "자료실", img: randomImg06, path: "library", text: "모든 자료는 이곳에" },
]

export const dexyMenus: Router[] = [
  { name: "고등내신", img: randomImg02, path: "gdns" },
  { name: "모의고사", img: randomImg03, path: "megs" },
  { name: "수능특강", img: randomImg04, path: "sntg" },
  { name: "필수문법", img: randomImg05, path: "psmb" },
  { name: "자료실", img: randomImg06, path: "library" },
]

export const dexygdns: Router[] = [
  { name: "영어", img: randomImg07, path: "eng" },
  { name: "영어I", img: randomImg08, path: "engI" },
  { name: "영어II", img: randomImg09, path: "engII" },
]

export const dexymegs: Router[] = [
  { name: "고1", img: randomImg10, path: "go1" },
  { name: "고2", img: randomImg01, path: "go2" },
]

export const dexygdnsBooks: Router[] = [
  { name: "능률김성곤", img: randomImg02, path: "neKim" },
  { name: "YBM박준언", img: randomImg03, path: "ymbPark" },
  { name: "비상홍민표", img: randomImg04, path: "bsHong" },
  { name: "지학사민찬규", img: randomImg05, path: "ghMin" },
  { name: "천재이재영", img: randomImg06, path: "cjLee" },
]

export const dexymegsBooks: Router[] = [
  { name: "2022년", img: randomImg07, path: "2022" },
  { name: "2021년", img: randomImg08, path: "2021" },
]

export const dexysntgBooks: Router[] = [
  { name: "23학번", img: randomImg09, path: "sn23" },
  { name: "22학번", img: randomImg10, path: "sn22" },
]

export const dexypsmbBooks: Router[] = [
  { name: "책이름1", img: randomImg01, path: "book1" },
  { name: "책이름2", img: randomImg02, path: "book2" },
  { name: "책이름3", img: randomImg03, path: "book3" },
]

export const dexyRouters: { before: Router[]; after: Router[] } = {
  before: [{ name: "로그인" }, { name: "회원가입", path: "sign-up" }, { name: "계정찾기", path: "lost-found" }, ...dexyMenus],
  after: [
    { name: "나의강의", path: "myLectures" },
    { name: "장바구니", path: "cart" },
    { name: "결제내역", path: "myPayments" },
    ...dexyMenus,
    { name: "로그아웃" },
  ],
}
