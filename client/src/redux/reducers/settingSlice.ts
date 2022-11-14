import { createSlice } from "@reduxjs/toolkit"

const initialState: Setting = {
  activeMenu: false,
  alert: { state: false },
}

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    menuHandler: (state, action: { payload: "on" | "off" | "toggle" }) => {
      switch (action.payload) {
        case "off":
          return { ...state, activeMenu: false }
        case "on":
          return { ...state, activeMenu: true }

        case "toggle":
          return { ...state, activeMenu: !state.activeMenu }
      }
    },
  },
})

export const { menuHandler } = settingSlice.actions

export default settingSlice.reducer
