"use client";

import {
  ComponentProps,
  ReactNode,
  RefObject,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { InputProps, SetFn, TextInput } from "./useTextInput";
import { twMerge } from "tailwind-merge";
import { IoCloseCircle } from "react-icons/io5";

export type SelectProps = { title: string | number; value: string };
type Props = InputProps &
  ComponentProps<"select"> & {
    data: SelectProps[];
    placeholder?: string;
    onSubmitEditing?: (value: string) => void;
  };

const Component = ({
  label,
  containerClassName,
  resetClassName,
  messageClassName,
  //   focused,
  setFocused,
  setValue,
  message,
  warpperClassName,
  messageShown = false,
  placeholder = "선택",
  onSubmitEditing,
  data,
  ...props
}: Props) => {
  return (
    <div className={twMerge("flex flex-col gap-1", containerClassName)}>
      {label && (
        <label
          htmlFor={props?.id}
          {...label}
          className={twMerge("text-zinc-500 text-xs", label?.className)}
        />
      )}
      <div className={twMerge("relative", warpperClassName)}>
        <select
          {...props}
          className={twMerge(
            "border outline-none focus:border-primary rounded h-10 w-full pl-1 pr-7 border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 appearance-none",
            props?.className,
          )}
          onChange={(e) => {
            setValue(e.target.value);
            if (onSubmitEditing)
              setTimeout(() => onSubmitEditing(e.target.value), 100);
            if (props?.onChange) props.onChange(e);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        >
          <option value="">{placeholder}</option>
          {data.map(({ value, title }) => (
            <option key={value} value={value}>
              {title}
            </option>
          ))}
        </select>
        <label
          htmlFor={props?.id}
          className={twMerge(
            "absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer text-zinc-400 hover:text-zinc-500 dark:text-zinc-600 active:opacity-80",
            resetClassName,
          )}
          onClick={() => {
            setValue("");
            //@ts-expect-error:must have ref don't worry
            props?.ref?.current?.showPicker();
          }}
        >
          <IoCloseCircle />
        </label>
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
};

export function useSelect(payload?: {
  value?: string;
  validator?: (value: string) => string | null;
}): SelectInput {
  const ref = useRef<HTMLSelectElement | null>(null);
  const focus = useCallback(() => {
    setTimeout(() => {
      if (!ref.current) return;
      ref.current.focus();
    }, 100);
  }, []);
  const showPicker = useCallback(
    () =>
      setTimeout(() => {
        if (!ref.current) return;
        ref.current.showPicker();
      }, 100),
    [],
  );
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
    showPicker,
    message,
  };
}

export type SelectInput = Omit<TextInput, "Component" | "props" | "ref"> & {
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
    ref: RefObject<HTMLSelectElement | null>;
    setValue: SetFn<string>;
    setFocused: SetFn<boolean>;
  };
  ref: RefObject<HTMLSelectElement | null>;
  showPicker: () => void;
};
