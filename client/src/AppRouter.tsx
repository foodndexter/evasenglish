import React, { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import { dexyRouters } from "./constants"
import { useAppSelector } from "./redux/hooks"
import { Home, Lectures, Library, LostFound, MyCart, MyLectures, MyPayments, Signup } from "./screeens"

const AppRouter = () => {
  const { state } = useAppSelector((state) => state.user)

  const routers = {
    after: [<MyLectures />, <MyCart />, <MyPayments />, <Lectures />, <Lectures />, <Lectures />, <Lectures />, <Library />, <></>],
    before: [<></>, <Signup />, <LostFound />, <Lectures />, <Lectures />, <Lectures />, <Lectures />, <Library />],
  }

  const [menus, setMenus] = useState<Router[]>([])
  useEffect(() => {
    if (state) {
      setMenus(dexyRouters.after)
    } else setMenus(dexyRouters.before)
  }, [state])
  return (
    <Routes>
      <Route path="/" element={<Home state={state} menus={menus} />} />
      {menus && menus.map((route, index) => <Route path={route.path} key={route.name} element={state ? routers.after[index] : routers.before[index]} />)}
    </Routes>
  )
}

export default AppRouter
