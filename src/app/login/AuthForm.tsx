"use client";

import {
  IoCalendarNumberOutline,
  IoCallOutline,
  IoLockClosedOutline,
  IoMailOutline,
  IoPersonCircleOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { Button, useForm, useTextInput, useToggle } from "../../components";
import { useCallback } from "react";
import { loginAction, signupAction } from "./auth.action";
import { a, c } from "@/fn";
import { getDateInputValue } from "@/utils";
import { isEmail, mobileValidator, passwordValidator } from "@/validators";
import { useJusoForm } from "../features";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/zustand";

const AuthForm = () => {
  const isSignup = useToggle();
  const router = useRouter();
  const Email = useTextInput({ validator: (email) => isEmail(email) });
  const Password = useTextInput({ validator: (pw) => passwordValidator(pw) });
  const ConfirmPassword = useTextInput({
    validator: (pw) =>
      passwordValidator(pw, {
        confirmPassword: Password.value,
        isConfirm: true,
      }),
  });
  const Name = useTextInput();
  const Dob = useTextInput({ value: getDateInputValue(new Date().getTime()) });
  const Mobile = useTextInput({ validator: (m) => mobileValidator(m) });
  const Add_Modal = useToggle();
  const Address = useJusoForm();

  const { Form, handler, isPending } = useForm();

  const onLogin = useCallback(() => {
    if (Email.message) return a(Email.message, Email.focus);
    if (Password.message) return a(Password.message, Password.focus);

    const email = Email.value;
    const password = Password.value;

    handler(async () => {
      try {
        const { accessToken, user } = await loginAction(email, password);
        console.log(user);
        useAuthStore.getState().handler(user);
        console.log("user init");
        router.push("/");
        console.log("redirect");
      } catch (error) {
        if (error instanceof Error) {
          switch (error.message) {
            case "No such user":
              c(
                "존재하지 않는 유저입니다. 회원가입 하시겠습니까?",
                isSignup.handler,
              );
              return;
            default:
              a(error.message);
              return;
          }
        }
      }
    });
  }, [handler, Email, Password, isSignup]);

  const onSignup = useCallback(() => {
    if (Email.message) return a(Email.message, Email.focus);
    if (Password.message) return a(Password.message, Password.focus);
    if (ConfirmPassword.message) return a(ConfirmPassword.message);
    if (Name.message) return a(Name.message, Name.focus);
    if (Dob.message) return a(Dob.message, Dob.focus);
    if (Mobile.message) return a(Mobile.message, Mobile.focus);

    const fn = () => {
      const email = Email.value;
      const password = Password.value;

      handler(async () => {
        try {
          const { accessToken, user } = await signupAction({
            email,
            password,
            dob: new Date(Dob.value),
            juso: Address.props.juso,
            mobile: Mobile.value,
            name: Name.value,
          });

          useAuthStore.getState().handler(user);
          router.push("/");
        } catch (error) {
          if (error instanceof Error) {
            switch (error.message) {
              default:
                return a(error.message);
            }
          }
        }
      });
    };
    if (!Address.props.juso) {
      return c(
        "주소가 입력되지 않았습니다. 주소를 검색하시겠습니까?",
        Add_Modal.handler,
        fn,
      );
    }
    fn();
  }, [
    Email,
    Password,
    handler,
    isSignup,
    router,
    Mobile,
    Add_Modal,
    Address,
    Mobile,
    Name,
    Password,
    ConfirmPassword,
    Dob,
    isSignup,
  ]);

  return (
    <div className="">
      <Form
        className="border md-mobile:max-w-75"
        onSubmit={isSignup.toggled ? onSignup : onLogin}
      >
        <h1>{isSignup.toggled ? "signup form" : "signin form"}</h1>
        <Email.Component
          {...Email.props}
          label={{
            children: (
              <>
                <IoMailOutline /> <p>이메일</p>
              </>
            ),
          }}
          messageShown={false}
        />
        <Password.Component
          {...Password.props}
          messageShown={false}
          type="password"
          label={{
            children: (
              <>
                <IoLockClosedOutline /> <p>비밀번호</p>
              </>
            ),
          }}
        />
        {isSignup.toggled && (
          <>
            <ConfirmPassword.Component
              {...ConfirmPassword.props}
              type="password"
              label={{
                children: (
                  <>
                    <IoLockClosedOutline /> <p>비밀번호 확인</p>
                  </>
                ),
              }}
            />
            <Name.Component
              {...Name.props}
              label={{
                children: (
                  <>
                    <IoPersonCircleOutline />
                    이름
                  </>
                ),
              }}
            />
            <Dob.Component
              {...Dob.props}
              type="date"
              label={{
                children: (
                  <>
                    <IoCalendarNumberOutline />
                    생년월일
                  </>
                ),
              }}
            />
            <Mobile.Component
              {...Mobile.props}
              type="tel"
              label={{
                children: (
                  <>
                    <IoCallOutline />
                    휴대전화
                  </>
                ),
              }}
            />
            <div className="space-y-1">
              <label htmlFor="add_button" className="text-xs text-zinc-500">
                주소
              </label>
              <div className="flex gap-2">
                <Button
                  id="add_button"
                  className="flex-1 border"
                  isTouchable
                  onClick={() => {
                    Add_Modal.handler();
                    Address.props.Keyword.focus();
                  }}
                >
                  <p className="text-sm line-clamp-1">
                    {Address.props.juso
                      ? `${Address.props.juso.roadAddr} ${Address.props.juso.rest}`
                      : "주소 검색"}
                  </p>
                </Button>
                <Button
                  id="add_button"
                  isPrimary
                  className="size-10"
                  type="button"
                  onClick={() => {
                    Add_Modal.handler();
                    Address.props.Keyword.focus();
                  }}
                >
                  <IoSearchOutline />
                </Button>
              </div>
            </div>
          </>
        )}
        <Button isPrimary disabled={isPending}>
          {isSignup.toggled ? "회원가입" : "로그인"}
        </Button>
        <div className="flex gap-2 justify-center">
          <Button
            isTouchable
            disabled={isPending}
            className="text-zinc-500 px-2 flex-1"
            onClick={() => {
              isSignup.handler();
              if (isSignup.toggled) {
                return c(
                  "지금까지 작성한 내용은 저장되지 않습니다. 회원가입을 취소하시겠습니까?",
                  () => {
                    Email.setValue("");
                    Password.setValue("");
                    ConfirmPassword.setValue("");
                    Name.setValue("");
                    Dob.setValue(getDateInputValue(new Date().getTime()));
                    Mobile.setValue("");
                  },
                );
              }
              Email.focus();
            }}
          >
            {isSignup.toggled ? "회원가입 취소" : "회원가입"}
          </Button>
        </div>
      </Form>
      {Add_Modal.toggled && (
        <Add_Modal.Modal>
          <Add_Modal.ModalBase>
            <Address.Component
              {...Address.props}
              cancelHandler={Add_Modal.handler}
            />
          </Add_Modal.ModalBase>
        </Add_Modal.Modal>
      )}
    </div>
  );
};

export default AuthForm;
