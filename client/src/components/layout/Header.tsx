import { styled } from "@stitches/react"
import { IoMenuSharp, IoCloseSharp } from "react-icons/io5"
import { getrgba } from "../../api"
import { menuHandler } from "../../redux/reducers/settingSlice"
import { AppDispatch } from "../../redux/store"

const Header = (props: { theme: Theme; top: number; width: number; activeMenu: boolean; navi: any; dispatch: AppDispatch }) => {
  const { theme, top, width, activeMenu, dispatch, navi } = props
  const { title, titleWeight, titleSize, backgroundColor, fontFamily, color } = theme

  const Container = styled("header", {
    position: "fixed",
    width: "100%",
    top: 0,
    left: 0,
    backgroundColor,
    borderBottom: `1px solid ${getrgba(color)}`,
    zIndex: 100,
  })

  const Wrap = styled("div", {
    maxWidth: 1200,
    margin: "0 auto",
    height: top,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: width < 767 ? 10 : 20,
    paddingRight: width < 767 ? 10 : 20,
  })

  const Title = styled("button", {
    fontSize: titleSize,
    fontWeight: titleWeight,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontFamily,
  })

  const MenuIcon = styled("button", {
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  })

  const onMenu = () => {
    dispatch(menuHandler("toggle"))
  }

  const onTitle = () => {
    dispatch(menuHandler("off"))
    navi("/")
  }
  return (
    <Container>
      <Wrap>
        <MenuIcon onClick={onMenu}>{!activeMenu ? <IoMenuSharp size={30} /> : <IoCloseSharp size={30} />}</MenuIcon>
        <Title onClick={onTitle}>{title.toUpperCase()}</Title>
      </Wrap>
    </Container>
  )
}

export default Header
