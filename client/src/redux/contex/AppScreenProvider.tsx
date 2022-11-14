import { createContext, ReactNode, useContext, useEffect, useState } from "react"

const app = createContext<AppScreen>({ width: 0, height: 0 })

export const AppScreenProvider = (props: { children: ReactNode }) => {
  const [screen, setScreen] = useState<AppScreen>({ width: window.innerWidth, height: window.innerHeight })

  useEffect(() => {
    const getScreen = () => setScreen({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener("resize", getScreen)

    return () => window.removeEventListener("resize", getScreen)
  }, [screen])

  return <app.Provider value={screen}>{props.children}</app.Provider>
}

export const useScreen = () => useContext(app)
