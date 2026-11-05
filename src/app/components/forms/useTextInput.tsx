"use client";

import {
  ComponentProps,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { IconType } from "react-icons";
import { IoCloseCircle } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

export type SetFn<T> = Dispatch<SetStateAction<T>>;
export type InputProps = {
  label?: ComponentProps<"label">;

  containerClassName?: ComponentProps<"div">["className"];
  warpperClassName?: ComponentProps<"div">["className"];
  resetClassName?: ComponentProps<"label">["className"];
  messageClassName?: ComponentProps<"label">["className"];

  //   focused: boolean;
  setFocused: SetFn<boolean>;

  setValue: SetFn<string>;
  message?: string | null;
  messageShown?: boolean;
  resetHidden?: boolean;
  ResetIcon?: IconType;
  onReset?: () => void;
};

type Props = InputProps & ComponentProps<"input">;

function Component({
  label,
  containerClassName,
  resetClassName,
  messageClassName,
  //   focused,
  setFocused,
  setValue,
  message,
  warpperClassName,
  messageShown,
  onReset,
  resetHidden = false,
  ResetIcon,
  ...props
}: Props) {
  return (
    <div className={twMerge("flex flex-col gap-1", containerClassName)}>
      {label && (
        <label
          htmlFor={props?.id}
          {...label}
          className={twMerge("text-xs text-gray-500", label?.className)}
        />
      )}
      <div className={twMerge("relative", warpperClassName)}>
        <input
          {...props}
          className={twMerge(
            "border outline-none focus:border-primary rounded h-10 w-full pl-2 pr-7 border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900",
            props?.className,
          )}
          onChange={(e) => {
            if (props.onChange) props.onChange(e);
            setValue(e.target.value);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {!resetHidden && (
          <label
            htmlFor={props?.id}
            className={twMerge(
              "absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer text-zinc-400 hover:text-zinc-500 dark:text-zinc-600 active:opacity-80",
              resetClassName,
            )}
            onClick={() => {
              setValue("");
              if (onReset) onReset();
            }}
          >
            {ResetIcon ? <ResetIcon /> : <IoCloseCircle />}
          </label>
        )}
      </div>
      {messageShown !== false && message && (
        <label
          htmlFor={props?.id}
          className={twMerge("text-xs text-red-500", messageClassName)}
        >
          {message}
        </label>
      )}
    </div>
  );
}

export type TextInput = {
  Component: ({
    label,
    containerClassName,
    resetClassName,
    messageClassName,
    setFocused,
    setValue,
    message,
    warpperClassName,
    messageShown,
    ...props
  }: Props) => ReactNode;
  props: {
    value: string;
    message: string | null;
    id: string;
    ref: RefObject<HTMLInputElement | null>;
    setValue: SetFn<string>;
    setFocused: SetFn<boolean>;
  };
  id: string;
  focus: () => void;
  scrollTo: () => void;
  ref: RefObject<HTMLInputElement | null>;
  value: string;
  message: string | null;
  focused: boolean;
  setValue: SetFn<string>;
  setFocused: SetFn<boolean>;
};

export function useTextInput(payload?: {
  value?: string;
  validator?: (value: string) => string | null;
}): TextInput {
  const ref = useRef<HTMLInputElement | null>(null);
  const focus = useCallback(() => {
    setTimeout(() => {
      if (!ref.current) return;
      ref.current.focus();
    }, 100);
  }, []);
  const scrollTo = useCallback(() => {
    setTimeout(() => {
      if (!ref.current) return;
      ref.current.scrollTo({ behavior: "smooth" });
    }, 100);
  }, []);

  const [value, setValue] = useState(payload?.value ?? "");
  const message = useMemo(() => {
    if (payload?.validator) return payload.validator(value);
    if (value.length === 0) return "Nothing has been typed in";
    return null;
  }, [value, payload]);

  const [focused, setFocused] = useState(false);
  const id = useId();
  const props = useMemo(
    () => ({ value, message, id, ref, setValue, setFocused }),
    [value, message, id],
  );

  return {
    Component,
    props,
    id,
    focus,
    scrollTo,
    ref,
    value,
    focused,
    setValue,
    setFocused,
    message,
  };
}
