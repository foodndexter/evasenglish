import { styled } from "@stitches/react"
import React, { useEffect, useState } from "react"
import { menuHandler } from "../../redux/reducers/settingSlice"
import { AppDispatch } from "../../redux/store"

const SideBar = (props: { theme: Theme; top: number; width: number; activeMenu: boolean; navi: any; dispatch: AppDispatch }) => {
  const { activeMenu, dispatch, navi, theme, top, width } = props
  const { backgroundColor, color } = theme

  const Container = styled("nav", {
    width: "100%",
    height: `calc(100vh - ${top}px)`,
    position: "fixed",
    top,
    zIndex: 99,
  })

  const Wrap = styled("div", {
    width: "100%",
    height: width >= 1200 ? "atuo" : "100%",
    backgroundColor,
    position: "relative",
    zIndex: 2,
  })

  const BG = styled("div", {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    lef: 0,
    backdropFilter: "blur(3px)",
  })

  const closeFn = () => dispatch(menuHandler("off"))
  return (
    <Container>
      <Wrap></Wrap>
      <BG onClick={closeFn} />
    </Container>
  )
}

export default SideBar
