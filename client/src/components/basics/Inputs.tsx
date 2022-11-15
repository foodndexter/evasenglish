import { styled } from "@stitches/react"
import React, { useEffect, useState } from "react"
import { useAppSelector } from "../../redux/hooks"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

type InputType = "password" | "text"

export const DexyInput = (props: { id?: any; value: any; onChange: (e: any) => void; placeHolder?: string; type?: InputType }) => {
  const { id, type, value, onChange, placeHolder } = props

  const { color } = useAppSelector((state) => state.theme)

  const [isFocused, setIsFocused] = useState(false)
  const [isPasswordShowing, setIsPasswordShowing] = useState(false)
  const [inputType, setInputType] = useState<InputType>("text")

  useEffect(() => {
    if (type) {
      setInputType(type)
    } else setInputType("text")
  }, [type])

  useEffect(() => {
    onBlur()
  }, [value, isFocused])

  const onFocus = () => {
    setIsFocused(true)
  }
  const onBlur = () => {
    if (value.length > 0) {
      setIsFocused(true)
    } else setIsFocused(false)
  }
  const onShow = () => {
    setInputType((prev) => {
      if (prev === "text") {
        return "password"
      } else return "text"
    })
  }

  return (
    <div className={isFocused ? "inputWrap focused" : "inputWrap"} style={{ borderColor: color }}>
      {placeHolder && (
        <label htmlFor={id} onClick={() => setIsFocused(true)}>
          {placeHolder}
        </label>
      )}
      {type === "password" && <button onClick={onShow}>{isPasswordShowing ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}</button>}
      <input id={id} type={inputType} onFocus={onFocus} onBlur={onBlur} value={value} onChange={(e) => onChange(e)} name={id} />
    </div>
  )
}
