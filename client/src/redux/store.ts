import { configureStore } from "@reduxjs/toolkit"
import { bannerReducer, lectureReducer, settingReducer, themeReducer } from "./reducers"

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    banner: bannerReducer,
    lectures: lectureReducer,
    setting: settingReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
