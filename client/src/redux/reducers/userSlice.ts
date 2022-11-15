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
    userHandler: (state, action: { payload: "off" | { data?: User } }) => {
      const { payload } = action
      if (payload === "off") {
        return { ...initialState, state: false }
      } else {
        const { data } = payload
        return data ? { ...data, state: true } : { ...state }
      }
    },
  },
})

export const { userHandler } = userSlice.actions

export default userSlice.reducer
