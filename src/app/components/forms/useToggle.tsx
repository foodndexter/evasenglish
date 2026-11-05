"use client";

import { useCallback, useState } from "react";
import { IoClose } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

export default function useToggle() {
  const [toggled, setToggled] = useState(false);
  const handler = useCallback(() => setToggled((prev) => !prev), []);
  const ModalBase = useCallback(
    (props: React.ComponentProps<"div">) => (
      <>
        <div className={twMerge("relative", toggled && "emerge")}>
          <div
            {...props}
            className={twMerge(
              "transition-all relative border border-zinc-200 dark:border-zinc-700 rounded bg-white dark:bg-black max-h-[calc(100vh-40px)] overflow-y-auto",

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
  return { toggled, setToggled, handler, Modal, ModalBase };
}
