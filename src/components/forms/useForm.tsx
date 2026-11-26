"use client";

import {
  ComponentProps,
  ReactNode,
  useCallback,
  useRef,
  useTransition,
} from "react";
import { CgSpinner } from "react-icons/cg";
import { twMerge } from "tailwind-merge";

export default function useForm() {
  const [isPending, handler] = useTransition();
  const ref = useRef<HTMLFormElement>(null);
  const Form = useCallback(
    (props: ComponentProps<"form">) => (
      <form
        {...props}
        ref={ref}
        onSubmit={(e) => {
          e.preventDefault();
          if (props.onSubmit) props.onSubmit(e);
        }}
        className={twMerge(
          "flex flex-col gap-2 rounded p-2 min-w-50 mx-auto max-w-200 border-border",
          props?.className,
        )}
      />
    ),
    [],
  );

  const SubmitButton = useCallback(
    (props: ComponentProps<"button">) => (
      <button
        {...props}
        type="submit"
        className={twMerge(
          "flex-1 rounded bg-primary text-white items-center justify-center gap-2 disabled:bg-primary/80",
          props?.className,
        )}
      >
        {props?.disabled && <CgSpinner className="animate-spin" />}

        {props?.children ?? "완료"}
      </button>
    ),
    [],
  );

  const SubmitArea = useCallback(
    ({
      container,
      cancel,
      onSubmit,
      onCancel,
      cancelChildren,
      submitChildren,
      isPending,
      cancelClassName,
      submitClassName,
    }: {
      submit?: string;
      cancel?: string;
      container?: ComponentProps<"div">["className"];
      cancelClassName?: ComponentProps<"button">["className"];
      submitClassName?: ComponentProps<"button">["className"];
      onCancel?: () => void;
      onSubmit?: () => void;
      cancelChildren?: ReactNode;
      submitChildren?: ReactNode;
      isPending?: boolean;
    }) => (
      <div className={twMerge("flex gap-2 w-full max-w-200", container)}>
        <button
          type={onCancel ? "button" : "reset"}
          className={twMerge(
            "border rounded h-10 items-center px-2 border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 dark:hover:text-300 dark:hover:bg-zinc-800 gap-2 disabled:opacity-50 min-w-20 justify-center",
            cancelClassName,
          )}
          onClick={onCancel}
          disabled={isPending}
        >
          {cancelChildren ?? (
            <>
              {isPending && <CgSpinner className="animate-spin" />}{" "}
              {cancel ?? "취소"}
            </>
          )}
        </button>
        <SubmitButton
          className={submitClassName}
          children={submitChildren}
          onClick={onSubmit}
          disabled={isPending}
        />
      </div>
    ),
    [SubmitButton],
  );

  return { isPending, handler, ref, Form, SubmitArea, SubmitButton };
}
