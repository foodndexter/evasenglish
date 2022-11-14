import { styled } from "@stitches/react"
import { ReactNode, useState, useEffect } from "react"

export const Page = (props: { children: ReactNode }) => {
  const Container = styled("div", {
    width: "100%",
    maxWidth: 1200,
    margin: "0 auto",
  })
  return <Container>{props.children}</Container>
}
