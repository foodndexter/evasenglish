import { styled } from "@stitches/react"
import { useEffect, useState } from "react"
import { useScreen } from "../redux/contex/AppScreenProvider"
import { useAppSelector } from "../redux/hooks"

const Init = (props: { state: boolean }) => {
  const { color, backgroundColor, title } = useAppSelector((state) => state.theme)

  const { width } = useScreen()
  const Container = styled("div", {
    width: "100vw",
    height: "100vh",
    backgroundColor,
    color,
    position: "fixed",
    zIndex: 10000,
  })

  const [fontSize, setFontSize] = useState(0)
  useEffect(() => {
    let size: number = 0
    if (width < 300) {
      size = 40
    } else if (width >= 300 && width < 768) {
      size = 50
    } else if (width >= 768 && width < 1200) {
      size = 60
    } else if (width >= 1200) {
      size = 100
    }

    setFontSize(size)
  }, [width])

  const Title = styled("span", {
    fontSize,
    fontWeight: 900,
    cursor: "pointer",
    "&:hover": {
      opacity: 0.9,
    },
    position: "absolute",
    left: "50%",
    bottom: "50%",
    transform: "translateX(-50%)",
  })
  return props.state ? (
    <></>
  ) : (
    <Container>
      <Title>{title.toUpperCase()}</Title>
    </Container>
  )
}

export default Init
