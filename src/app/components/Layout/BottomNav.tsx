"use client";
import { IconType } from "react-icons";
import {
  IoCard,
  IoCardOutline,
  IoEllipsisHorizontalCircle,
  IoEllipsisHorizontalCircleOutline,
  IoLayers,
  IoLayersOutline,
  IoSchool,
  IoSchoolOutline,
} from "react-icons/io5";
import BottomLink from "./BottomLink";

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 border-t w-full max-w-225 border-border flex p-2 justify-center gap-4 md-mobile:bottom-2 md-mobile:border md-mobile:w-auto md-mobile:rounded-xl  bg-zin-500/50 backdrop-blur-xs z-10">
      {menus.map((menu, index) => (
        <BottomLink {...menu} key={index} />
      ))}
    </nav>
  );
};

export default BottomNav;

export type Menu = {
  name: string;
  href: string;
  Icon: IconType;
  FocusedIcon: IconType;
};
const menus: Menu[] = [
  {
    name: "학생관리",
    href: "/",
    Icon: IoSchoolOutline,
    FocusedIcon: IoSchool,
  },
  {
    name: "결제내역",
    href: "/payments",
    Icon: IoCardOutline,
    FocusedIcon: IoCard,
  },
  {
    name: "목록관리",
    href: "/lists",
    Icon: IoLayersOutline,
    FocusedIcon: IoLayers,
  },
  {
    name: "환경설정",
    href: "/settings",
    Icon: IoEllipsisHorizontalCircleOutline,
    FocusedIcon: IoEllipsisHorizontalCircle,
  },
];
