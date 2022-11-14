import { createSlice } from "@reduxjs/toolkit"

const initialState: Banner[] = []

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
