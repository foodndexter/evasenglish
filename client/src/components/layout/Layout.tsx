import { styled } from "@stitches/react"
import React, { ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { useScreen } from "../../redux/contex/AppScreenProvider"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import Header from "./Header"
import SideBar from "./SideBar"

const Layout = (props: { children: ReactNode }) => {
  const { theme, setting, user } = useAppSelector((state) => state)
  const { activeMenu } = setting
  const { color, backgroundColor, fontSize, fontWeight, fontFamily } = theme

  const { width } = useScreen()
  const top = 60
  const Container = styled("div", {
    textAlign: "center",
    color,
    backgroundColor,
    fontWeight,
    fontSize,
    fontFamily,
    paddingTop: top,
  })

  const dispatch = useAppDispatch()
  const navi = useNavigate()
  return (
    <Container id={theme.title}>
      <Header theme={theme} top={top} width={width} activeMenu={activeMenu} dispatch={dispatch} navi={navi} />
      {activeMenu && <SideBar theme={theme} top={top} width={width} activeMenu={activeMenu} dispatch={dispatch} navi={navi} />}
      {props.children}
    </Container>
  )
}

export default Layout
