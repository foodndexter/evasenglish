import { createSlice } from "@reduxjs/toolkit"
import { dexyLectures } from "../../constants"

const initialState: Lecture[] = [...dexyLectures]

const lectureSlice = createSlice({
  name: "lectures",
  initialState,
  reducers: {
    lectureHandler: (state, action) => {
      return [...state]
    },
  },
})

export const { lectureHandler } = lectureSlice.actions

export default lectureSlice.reducer
