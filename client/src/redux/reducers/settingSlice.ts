import { createSlice } from "@reduxjs/toolkit"

const initialState: Setting = {
  activeMenu: false,
  alert: { state: false },
  confirm: { state: false },
  modal: { state: false },
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
    alertHandler: (state, action: { payload: "off" | { message?: string; type?: string; okBtn?: string; data?: any; title?: string } }) => {
      const { payload } = action
      if (payload === "off") {
        return { ...state, alert: { state: false } }
      } else {
        const { message, okBtn, type, data, title } = payload
        return {
          ...state,
          alert: { state: true, message: message && message, okBtn: okBtn && okBtn, type: type && type, data: data && data, title: title && title },
        }
      }
    },
    confirmHandler: (
      state,
      action: { payload: "off" | { message?: string; type?: string; okBtn?: string; data?: any; cancelBtn?: string; title?: string } }
    ) => {
      const { payload } = action
      if (payload === "off") {
        return { ...state, confirm: { state: false } }
      } else {
        const { message, okBtn, type, data, cancelBtn, title } = payload
        return {
          ...state,
          alert: {
            state: true,
            message: message && message,
            okBtn: okBtn && okBtn,
            type: type && type,
            data: data && data,
            title: title && title,
            cancelBtn: cancelBtn && cancelBtn,
          },
        }
      }
    },
    modalHandler: (state, action) => {},
  },
})

export const { menuHandler, alertHandler, confirmHandler, modalHandler } = settingSlice.actions

export default settingSlice.reducer
