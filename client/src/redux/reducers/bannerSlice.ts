import { createSlice } from "@reduxjs/toolkit"
import { dexyBanner } from "../../constants"

const initialState: Banner[] = [...dexyBanner]

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    bannerHandler: (state, action) => {
      return [...state]
    },
  },
})

export const { bannerHandler } = bannerSlice.actions

export default bannerSlice.reducer
