import { createSlice } from "@reduxjs/toolkit"
import { dexyRGB } from "../../constants"

const initialState: Theme = {
  backgroundColor: `rgb(${dexyRGB.white})`,
  color: `rgb(${dexyRGB.black})`,
  fontFamily: `'Noto Sans KR', sans-serif`,
  fontSize: 16,
  fontWeight: 300,
  title: "EVAS",
  titleSize: 25,
  titleWeight: 900,
}

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    themeHandler: (
      state,
      action: { payload: { name: "color" | "backgroundColor" | "fontFamily" | "fontSize" | "title" | "titleSize" | "titleWeight"; value: any } }
    ) => {
      const { name, value } = action.payload
      return { ...state, [name]: value }
    },
  },
})

export const { themeHandler } = themeSlice.actions

export default themeSlice.reducer
