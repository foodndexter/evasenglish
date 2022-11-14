import { styled } from "@stitches/react"
import React, { useEffect, useRef, useState } from "react"
import { useScreen } from "../../redux/contex/AppScreenProvider"
import { FiChevronRight, FiChevronLeft } from "react-icons/fi"
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs"

const DexyBanner = (props: { banners: Banner[]; theme: Theme; navi: any }) => {
  const { banners, theme, navi } = props
  const color = theme.backgroundColor
  const { width } = useScreen()

  const [contents, setContents] = useState(0)

  const [slideRef, setSlideRef] = useState(useRef(contents))

  const changeContents = (direction?: "next" | "prev") => {
    const length = banners.length - 1
    if (direction) {
      if (direction === "next") {
        setContents((prev) => {
          if (contents === length) {
            return 0
          } else return prev + 1
        })
      } else
        setContents((prev) => {
          if (contents === 0) {
            return length
          } else return prev - 1
        })
    }
  }

  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    setSlideRef({ current: contents })
  }, [contents])

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => changeContents("next"), 1000 * 3)

      return () => clearInterval(interval)
    }
  }, [isAutoPlaying, slideRef])

  const Container = styled("div", {
    position: "relative",
  })

  const initialStyle: React.CSSProperties = {
    position: "absolute",
    zIndex: 1,
    top: "50%",
    transform: "translateY(-50%)",
  }

  const [size, setSize] = useState("")
  useEffect(() => {
    if (width < 768) {
      setSize("10px")
    } else if (width >= 768) {
      setSize("20px")
    }
  }, [width])

  const Left = styled("button", {
    ...initialStyle,
    left: size,
  })

  const Right = styled("button", {
    ...initialStyle,
    right: size,
  })

  const PlayPause = styled("button", {
    ...initialStyle,
    top: "none",
    transform: "none",
    bottom: width < 768 ? 10 : 20,
    right: width < 768 ? 10 : 20,
  })

  const Dots = styled("div", {
    ...initialStyle,
    top: "none",
    bottom: width < 768 ? 10 : 20,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    justifyContent: "center",
  })

  return (
    <Container>
      <Left onClick={() => changeContents("prev")}>
        <FiChevronLeft size={width >= 768 && width < 1200 ? 30 : width >= 1200 ? 40 : 20} color={color} />
      </Left>
      <Right onClick={() => changeContents("next")}>
        <FiChevronRight size={width >= 768 && width < 1200 ? 30 : width >= 1200 ? 40 : 20} color={color} />
      </Right>

      <Slides width={width} banner={banners[contents]} color={color} navi={navi} />

      <PlayPause onClick={() => setIsAutoPlaying((prev) => !prev)}>
        {isAutoPlaying ? (
          <BsPauseFill size={width >= 768 && width < 1200 ? 30 : width >= 1200 ? 40 : 20} color={color} />
        ) : (
          <BsFillPlayFill size={width >= 768 && width < 1200 ? 30 : width >= 1200 ? 40 : 20} color={color} />
        )}
      </PlayPause>
      <Dots>
        {banners &&
          banners.map((banner, index) => (
            <Dot color={color} width={width} index={index} contents={contents} key={banner.name} onClick={(index: number) => setContents(index)} />
          ))}
      </Dots>
    </Container>
  )
}

export default DexyBanner

const Slides = (props: { width: number; banner: Banner; color: string; navi: any }) => {
  const { width, banner, color, navi } = props
  const Container = styled("button", {
    width: "100%",
  })

  const Wrap = styled("div", {
    color,
    fontSize: 18,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    transition: "all .2s ease-out",
  })

  const Name = styled("p", {})
  const Text = styled("p", {})

  const onClick = () => {
    console.log(banner)
    navi(banner.path)
  }
  return (
    <Container onClick={onClick}>
      <Wrap>
        <Name>{banner.name}</Name>
        <Text>{banner.text}</Text>
      </Wrap>
      <img src={banner?.img} alt="" />
    </Container>
  )
}

const Dot = (props: { width: number; index: number; contents: number; onClick: (index: number) => void; color: string }) => {
  const { width, index, contents, onClick, color } = props
  const [size, setSize] = useState(0)

  useEffect(() => {
    if (width < 768) {
      if (contents === index) {
        setSize(20)
      } else setSize(10)
    } else {
      if (contents === index) {
        setSize(30)
      } else setSize(15)
    }
  }, [width, contents, index])

  const Container = styled("button", {
    height: width < 768 ? 4 : 6,
    borderRadius: 50,
    backgroundColor: color,
    margin: "0 5px",
    width: size,
    opacity: contents === index ? 0.8 : 0.5,
  })
  return <Container onClick={() => onClick(index)} />
}
