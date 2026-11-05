import Link from "next/link";
import React, { useMemo } from "react";
import { Menu } from "./BottomNav";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

const BottomLink = ({ FocusedIcon, Icon, href, name }: Menu) => {
  const pathname = usePathname();
  const focused = useMemo(() => {
    if (pathname === "/") {
      if (name === "학생관리") {
        return true;
      }
    }
    if (href === pathname) return true;
    return false;
  }, [href, pathname, name]);
  return (
    <Link href={href} className="flex flex-col gap-1 items-center ">
      <div
        className={twMerge(
          "size-10 items-center justify-center flex text-lg rounded-lg bg-zinc-100 text-zinc-500",
          focused && "bg-primary",
        )}
      >
        {focused ? <FocusedIcon className="text-white" /> : <Icon />}
      </div>
      <p className={twMerge(focused && "text-primary", "text-xs")}>{name}</p>
    </Link>
  );
};

export default BottomLink;
