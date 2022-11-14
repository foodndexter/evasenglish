type Theme = {
  color: string | ""
  backgroundColor: string | ""
  fontSize: number | 0
  fontWeight: number | 0
  title: string | "" | `'Noto Sans KR', sans-serif`
  titleSize: number | 0
  titleWeight: number | 0
  fontFamily: string | ""
}

type AppScreen = { width: 0 | number; height: number | 0 }

type Setting = {
  activeMenu: boolean
  alert: Popup
  confirm: Popup
  modal: Popup
}

type Popup = { state: boolean; message?: string; okBtn?: string; data?: any; cancelBtn?: string; title?: string }

type User = {
  state: boolean
  email: string
  name: string
  tel: string
  lectures: Lecture[]
  payments: Lecture[]
  cart: Lecture[]
  basket: Lecture[]
}
