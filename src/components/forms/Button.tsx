import { IconBaseProps } from "react-icons";
import { CgSpinner } from "react-icons/cg";
import { IoCloseOutline } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

type Props = React.ComponentProps<"button"> & {
  icon?: IconBaseProps;
  isPrimary?: boolean;
  isTouchable?: boolean;
  isItem?: boolean;
};
const Button = ({ icon, isPrimary, isTouchable, isItem, ...props }: Props) => {
  return (
    <button
      {...props}
      type={props?.type ?? (isPrimary ? "submit" : "button")}
      className={twMerge(
        "items-center justify-center border-zinc-200 dark:border-zinc-700",
        isTouchable &&
          "active:bg-zinc-200 dark:active:bg-zinc-700 bg-zinc-50 rounded dark:bg-zinc-900 h-10",
        isPrimary && "bg-primary text-white rounded h-10",
        isItem && "text-xs h-auto p-1",
        props?.className,
      )}
    >
      {props?.disabled && (
        <CgSpinner
          {...icon}
          className={twMerge("mr-2 animate-spin", icon?.className)}
        />
      )}
      {props?.children} {isItem && <IoCloseOutline />}
    </button>
  );
};

export default Button;
