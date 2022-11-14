import { styled } from "@stitches/react"
import React, { useEffect, useState } from "react"
import { getrgba } from "../../api"
import { dexyRouters } from "../../constants"
import { menuHandler } from "../../redux/reducers/settingSlice"
import { AppDispatch } from "../../redux/store"

const SideBar = (props: { theme: Theme; top: number; width: number; activeMenu: boolean; navi: any; dispatch: AppDispatch; user: User }) => {
  const { activeMenu, dispatch, navi, theme, top, width, user } = props
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
    border: "1px solid",
    display: "flex",
    flexDirection: "column",
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

  const [menus, setMenus] = useState<Router[]>([])
  useEffect(() => {
    user.state ? setMenus(dexyRouters.after) : setMenus(dexyRouters.before)
  }, [user.state])

  const onClick = (menu: Router) => {
    if (menu.path) {
      navi(menu.path)
    }
    closeFn()
  }
  return (
    <Container>
      <Wrap>{menus && menus.map((menu) => <Item theme={theme} onClick={onClick} key={menu.name} menu={menu} />)}</Wrap>
      <BG onClick={closeFn} />
    </Container>
  )
}

export default SideBar

const Item = (props: { menu: Router; onClick: (menu: Router) => void; theme: Theme }) => {
  const { menu, onClick, theme } = props
  const { fontSize, fontWeight, color, backgroundColor } = theme
  const Button = styled("button", {
    fontSize,
    fontWeight,
    height: 50,
    borderRadius: 0,
    "&:hover": {
      backgroundColor: getrgba(color),
    },
  })

  return <Button onClick={() => onClick(menu)}>{menu.name}</Button>
}
