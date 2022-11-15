import { styled } from "@stitches/react"
import { ReactNode, useEffect } from "react"
import { getrgba } from "../../api"
import { useAppSelector } from "../../redux/hooks"
import { alertHandler, confirmHandler, modalHandler } from "../../redux/reducers/settingSlice"
import { userHandler } from "../../redux/reducers/userSlice"
import { AppDispatch } from "../../redux/store"
import { LoginModal } from "./Modal"

type PopupType = "alert" | "modal" | "confirm"
type Props = { dispatch: AppDispatch; navi: any }
export const Alert = (props: Props) => {
  const { dispatch, navi } = props
  const { alert } = useAppSelector((state) => state.setting)
  const { state } = alert
  const closeFn = () => dispatch(alertHandler("off"))
  return (
    <Layout closeFn={closeFn} state={state} type="alert">
      <ForAlertConfirm popup={alert} closeFn={closeFn} type="alert" />
    </Layout>
  )
}

export const DexyConfirm = (props: Props) => {
  const { dispatch, navi } = props
  const { confirm } = useAppSelector((state) => state.setting)
  const { state } = confirm
  const closeFn = () => dispatch(confirmHandler("off"))

  const onOkBtn = () => {
    closeFn()
    switch (confirm.type) {
      case "로그아웃":
        dispatch(alertHandler({ title: "작별인사", message: "안녕히 가세요~" }))
        return dispatch(userHandler("off"))
    }
  }
  return (
    <Layout closeFn={closeFn} state={state} type="confirm">
      <ForAlertConfirm popup={confirm} closeFn={closeFn} type="confirm" onOkBtn={onOkBtn} />
    </Layout>
  )
}

const ForAlertConfirm = (props: { popup: Popup; closeFn: () => void; type: PopupType; onOkBtn?: () => void }) => {
  const { popup, closeFn, type } = props
  const { title, message, okBtn, cancelBtn } = popup

  const { color } = useAppSelector((state) => state.theme)

  const Container = styled("div", {})
  const Messages = styled("div", {
    borderBottom: `1px solid ${color}`,
  })
  const Title = styled("p", {
    fontSize: 16,
    fontWeight: 400,
    paddingLeft: 10,
  })
  const Text = styled("p", {
    textAlign: "left",
    padding: "10px 0 20px",
  })

  const Buttons = styled("div", {
    display: "flex",
    height: 50,
  })

  const OkButton = styled("button", {
    width: "100%",
    fontSize: 16,
    "&:hover": {
      color: type === "confirm" ? popup.type === "로그아웃" && "Tomato" : "RoyalBlue",
    },
  })

  const CancelButton = styled("button", {
    width: "100%",
    fontSize: 16,
    "&:hover": {
      color: type === "confirm" ? "RoyalBlue" : "Tomato",
    },
  })

  const onOkBtn = () => {
    if (type === "alert") {
      closeFn()
    }
    props.onOkBtn && props.onOkBtn()
  }
  return (
    <Container>
      <Messages>
        {title && <Title>{title}</Title>}
        <Text>{message}</Text>
      </Messages>
      <Buttons>
        <OkButton onClick={onOkBtn}>{okBtn ? okBtn : "확인"}</OkButton>
        {type === "confirm" && <CancelButton onClick={closeFn}>{cancelBtn ? cancelBtn : "취소"}</CancelButton>}
      </Buttons>
    </Container>
  )
}

export const DexyModal = (props: Props) => {
  const { dispatch, navi } = props

  const { state, type } = useAppSelector((state) => state.setting.modal)

  const closeFn = () => dispatch(modalHandler("off"))

  console.log(type)
  return (
    <Layout closeFn={closeFn} state={state} type="modal">
      {type &&
        {
          로그인: <LoginModal dispatch={dispatch} navi={navi} closeFn={closeFn} />,
        }[type]}
    </Layout>
  )
}

const Layout = (props: { closeFn: () => void; children: ReactNode; state: boolean; type: PopupType }) => {
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
