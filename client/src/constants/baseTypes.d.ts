type VimeoSrc = 275602204 | 66140585 | 287903693 | 282059182 | 284319225 | 301760075 | 301767975 | 296795894

type Menu = "로그인" | "회원가입" | "계정찾기" | "로그아웃" | "환경설정" | "나의강의" | "장바구니" | "결제내역"

type Sort = "고등내신" | "모의고사" | "수능특강" | "필수문법" | "자료실"
type Router = {
  name: Sort | Book | Category | Menu
  img?: string
  path?: string
}

type Chpater = "1과" | "2과" | "3과" | "4과" | "5과" | "6과" | "7과" | "8과" | "9과" | "10과" | "Part.1" | "Part.2" | "Part.3" | "Part.4"

type LectureSrc = {
  lec: string
  src: VimeoSrc
}

type Price = 10000 | 15000
type Amount = 3 | 4

type Category = "영어" | "영어I" | "영어II" | "고1" | "고2"

type Book =
  | "천재이재영"
  | "비상홍민표"
  | "능률김성곤"
  | "YBM박준언"
  | "지학사민찬규"
  | "2022년"
  | "2021년"
  | "23학번"
  | "22학번"
  | "책이름1"
  | "책이름2"
  | "책이름3"

type Lecture = {
  sort: Sort
  category: Category
  chapter: Chpater
  book: Book
  name: string
  title: string
  src: LectureSrc[]
  price: Price
  amount: Amount
  id: number
  img: string
  expiresIn?: 28
  purchasedAt?: string[]
}

type Banner = {
  name: string
  path: string
  img: string
  text: string
}
