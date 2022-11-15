import { styled } from "@stitches/react"
import React, { useEffect, useState } from "react"
import { authService } from "../../firebase"
import { AppDispatch } from "../../redux/store"
import { DexyButton } from "../basics/Buttons"
import { DexyInput } from "../basics/Inputs"

type Props = { dispatch: AppDispatch; navi: any; closeFn: () => void }
export const LoginModal = (props: Props) => {
  const [input, setInput] = useState<LoginDetail>({ email: "", password: "" })
  const onChange = (e: any) => {
    const { value, name } = e.target
    setInput({ ...input, [name]: value })
  }

  useEffect(() => {
    console.log(input)
  }, [input])

  const onSubmit = async (e: any) => {
    e.preventDefault()
    await authService.signInWithEmailAndPassword(input.email, input.password)
  }

  return (
    <form onSubmit={onSubmit}>
      <DexyInput value={input.email} onChange={onChange} id="email" placeHolder="example@example.com" />
      <DexyInput value={input.password} onChange={onChange} id="password" placeHolder="*******" type="password" />
      <DexyButton onClick={onSubmit} width="100%" marginBottom={10}>
        로그인
      </DexyButton>
      <DexyButton border={true} onClick={() => props.navi("/sign-up")} width="100%">
        회원가입
      </DexyButton>
    </form>
  )
}
