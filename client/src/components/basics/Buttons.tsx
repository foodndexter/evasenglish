import { styled } from "@stitches/react"
import React, { ReactNode } from "react"
import { useAppSelector } from "../../redux/hooks"

export const DexyButton = (props: {
  children: ReactNode
  onClick: (e: any) => void
  justifyContent?: string
  width?: any
  border?: boolean
  margin?: any
  marginBottom?: number
}) => {
  const { children, onClick, justifyContent, width, border, margin, marginBottom } = props

  const { color, backgroundColor, fontSize, fontWeight, fontFamily } = useAppSelector((state) => state.theme)
  const Button = styled("button", {
    heigth: "100%",
    display: "flex",
    justifyContent: justifyContent ? justifyContent : "center",
    color: border ? color : backgroundColor,
    backgroundColor: border ? backgroundColor : color,
    fontSize,
    fontWeight,
    fontFamily,
    border: `1px solid ${color}`,
    padding: 10,
    height: 50,
    width,
    margin,
    marginBottom,
  })
  return <Button onClick={onClick}>{children}</Button>
}
