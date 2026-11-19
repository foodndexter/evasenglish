"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { IoClose } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

export default function useToggle() {
  const [toggled, setToggled] = useState(false);
  const handler = useCallback(() => setToggled((prev) => !prev), []);

  useEffect(() => {
    if (toggled) {
      const fn = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setToggled(false);
        }
      };

      window.addEventListener("keydown", fn);
      return () => {
        window.removeEventListener("keydown", fn);
      };
    }
  }, [toggled]);

  const ModalBase = useCallback(
    (props: React.ComponentProps<"div">) => (
      <>
        <div className={twMerge("relative", toggled && "emerge")}>
          <div
            {...props}
            className={twMerge(
              "transition-all relative border border-zinc-200 dark:border-zinc-700 rounded bg-white dark:bg-black max-h-[calc(100vh-110px)] overflow-y-auto w-[calc(100vw-60px)]",

              props?.className,
            )}
          >
            {props?.children}
          </div>
          <button
            type="button"
            onClick={() => setToggled(false)}
            className="absolute top-0 left-[calc(100%+4px)]"
          >
            <IoClose />
          </button>
        </div>
        <span
          className="absolute top-0 left-0 size-full -z-1"
          onClick={() => setToggled(false)}
        />
      </>
    ),
    [toggled],
  );
  const Modal = useCallback(
    (props: React.ComponentProps<"div">) => (
      <div
        {...props}
        className={twMerge(
          "transition-all flex justify-center items-start",
          toggled &&
            "fixed top-0 left-0 w-full h-dvh backdrop-blur-xs bg-black/10",
          props?.className,
        )}
      />
    ),
    [toggled],
  );
  const id = useId();
  const Switch = useCallback(
    ({ label, text, handler, state }: SwitchProps) => {
      return (
        <div className="flex flex-col gap-1">
          {label && (
            <label className="text-xs text-gray-500" htmlFor={id}>
              {label}
            </label>
          )}
          <div className="flex">
            {text && (
              <label htmlFor={id} className="flex-1">
                {text}
              </label>
            )}
            <button
              type="button"
              onClick={handler}
              className={twMerge(
                "border rounded-full h-5 w-9 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 items-center pl-0.5 transition-all",
                state && "pl-4.5 bg-primary dark:bg-primary",
              )}
              id={id}
            >
              <span className="size-3.5 rounded-full bg-white dark:bg-zinc-200" />
            </button>
          </div>
        </div>
      );
    },
    [id],
  );
  return { toggled, setToggled, handler, Modal, ModalBase, Switch };
}

export type SwitchProps = {
  label?: string;
  text?: string;
  state: boolean;
  handler: () => void;
};
