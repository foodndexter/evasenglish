import { styled } from "@stitches/react"
import React, { ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { DexyBanner, Page } from "../components"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { RiUser3Line, RiUserAddLine, RiUserShared2Line, RiUserSearchLine } from "react-icons/ri"
import { useScreen } from "../redux/contex/AppScreenProvider"
import { AiOutlineFolder } from "react-icons/ai"
import { BsBasket2 } from "react-icons/bs"
import { MdOutlinePayments } from "react-icons/md"
import { confirmHandler, modalHandler } from "../redux/reducers/settingSlice"

const Home = (props: { menus: Router[]; state: boolean }) => {
  const { menus, state } = props
  const { banner, theme } = useAppSelector((state) => state)

  const navi = useNavigate()
  return (
    <Page>
      <DexyBanner banners={banner} theme={theme} navi={navi} />
      <Icons menus={menus} navi={navi} state={state} />
    </Page>
  )
}

export default Home

const Icons = (props: { menus: Router[]; navi: any; state: boolean }) => {
  const { width } = useScreen()
  const { menus, navi, state } = props
  const Container = styled("div", {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexFlow: "row wrap",
  })
  return <Container>{menus && menus.map((route, index) => <AppIcon index={index} navi={navi} key={route.name} menu={route} state={state} />)}</Container>
}

const AppIcon = (props: { menu: Router; navi: any; size?: number; index: number; state: boolean }) => {
  const { navi, menu, size, index, state } = props
  const { name, img, path } = menu

  const Button = styled("button", {
    margin: 10,
  })

  const Wrap = styled("div", {
    width: size ? size : 60,
    height: size ? size : 60,
    borderRadius: 20,
    border: "1px solid",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  })

  const Img = styled("img", {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  })

  const Name = styled("span", {
    fontSize: 16,
    marginTop: 10,
    display: "block",
  })

  const icons = {
    before: [
      {
        name: "?????????",
        icon: <RiUser3Line size={30} />,
      },
      {
        name: "????????????",
        icon: <RiUserAddLine size={30} />,
      },
      {
        name: "????????????",
        icon: <RiUserSearchLine size={30} />,
      },
    ],
    after: [
      { name: "????????????", icon: <AiOutlineFolder size={30} /> },
      { name: "????????????", icon: <BsBasket2 size={30} /> },
      { name: "????????????", icon: <MdOutlinePayments size={30} /> },
      { name: "", icon: "" },
      { name: "", icon: "" },
      { name: "", icon: "" },
      { name: "", icon: "" },
      { name: "", icon: "" },
      { name: "????????????", icon: <RiUserShared2Line size={30} /> },
    ],
  }

  const dispatch = useAppDispatch()
  const onClick = () => {
    if (path) {
      console.log(`navi to ${path}`)
    } else {
      if (name === "????????????") {
        dispatch(confirmHandler({ title: "????????????", message: "?????? ???????????? ???????????????????", okBtn: "????????????", type: "????????????" }))
      } else if (name === "?????????") {
        dispatch(modalHandler(name))
      }
    }
  }

  return (
    <Button onClick={onClick}>
      <Wrap>{img ? <Img src={img} alt="" /> : state ? icons.after[index]?.icon : icons.before[index].icon}</Wrap>
      <Name>{name}</Name>
    </Button>
  )
}
