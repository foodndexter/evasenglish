import { styled } from "@stitches/react"
import React, { ReactNode, useEffect } from "react"
import { getrgba } from "../../api"
import { useAppSelector } from "../../redux/hooks"
import { alertHandler } from "../../redux/reducers/settingSlice"
import { AppDispatch } from "../../redux/store"

export const Alert = (props: { dispatch: AppDispatch; navi: any }) => {
  const { dispatch, navi } = props
  const { alert } = useAppSelector((state) => state.setting)
  const { state, data, message, okBtn } = alert
  const closeFn = () => dispatch(alertHandler("off"))
  return (
    <Layout closeFn={closeFn} state={state} type="alert">
      Alert
    </Layout>
  )
}

const Layout = (props: { closeFn: () => void; children: ReactNode; state: boolean; type: "alert" | "modal" | "confirm" }) => {
  const { children, closeFn, state, type } = props
  const { backgroundColor, color } = useAppSelector((state) => state.theme)

  const Container = styled("div", {
    position: "fixed",
    zIndex: type === "alert" ? 98 : type === "confirm" ? 97 : 96,
    width: "100vw",
    height: state ? "calc(100vh - 60px)" : 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    transition: "all .2 ease-out",
  })

  const Wrap = styled("div", {
    position: "relative",
    width: "calc(100% - 40px)",
    maxWidth: 300,
    backgroundColor,
    margin: "0 auto",
    padding: 10,
    border: `1px solid ${color}`,
    borderRadius: 10,
    zIndex: 2,
  })

  const BG = styled("div", {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 1,
    backdropFilter: "blur(3px)",
    backgroundColor: getrgba(color),
  })

  return (
    <Container>
      <Wrap>{children}</Wrap>
      <BG onClick={closeFn} />
    </Container>
  )
}

const ForAlertConfirm = (props: Popup) => {
  const { title, message, okBtn, cancelBtn } = props

  const { backgroundColor, color } = useAppSelector((state) => state.theme)

  const Container = styled("div", {})
  const Messages = styled("div", {})
  const Title = styled("p", {})
  const Text = styled("p", {})

  const Buttons = styled("div", {})
  const OkButton = styled("button", {})
  const CancelButton = styled("button", {})
  return (
    <Container>
      <Messages>
        {title && <Title>{title}</Title>}
        <Text>{message}</Text>
      </Messages>
      <Buttons>
        <OkButton>{okBtn}</OkButton>
        {cancelBtn && <CancelButton>{cancelBtn}</CancelButton>}
      </Buttons>
    </Container>
  )
}
