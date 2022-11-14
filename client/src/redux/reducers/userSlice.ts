import { createSlice } from "@reduxjs/toolkit"

const initialState: User = {
  state: false,
  name: "",
  tel: "",
  email: "",
  basket: [],
  lectures: [],
  cart: [],
  payments: [],
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userHandler: (state, action) => {
      return { ...state }
    },
  },
})

export const { userHandler } = userSlice.actions

export default userSlice.reducer
