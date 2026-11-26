"use client";

import { useCallback, useState } from "react";
import { useSelect, useToggle } from "./components";
import { StudentForm } from "./features";
import { IoAdd, IoFilterOutline } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import { useAuthStore } from "@/zustand";
import { redirect } from "next/navigation";
import Link from "next/link";

const HomePage = () => {
  const { user, initialized } = useAuthStore();

  const M = useToggle();
  const [data, setData] = useState([]);

  const [isIcon, setIsIcon] = useState(false);
  const [numOfRow, setNumOfRow] = useState(1);
  const nrHandler = useCallback(
    () => setNumOfRow((prev) => (prev < 4 ? prev + 1 : 1)),
    [],
  );
  const F = useToggle();

  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const onDeleteSelected = useCallback(() => {
    console.log("delete", selectedStudents.join(", "));
  }, [selectedStudents]);

  const U = useSelect();
  if (!initialized) {
    return <h1>is loading...</h1>;
  }
  if (!user) {
    return <h1>Not logged in</h1>;
  }
  return (
    <main>
      <header>
        {user.biz.length > 0 ? (
          <U.Component
            {...U.props}
            data={user.biz.map(({ id, name }) => ({ title: name, value: id }))}
          />
        ) : (
          <Link href="/settings/biz/create">No biz added yet</Link>
        )}
      </header>
    </main>
  );
};

export default HomePage;
const base =
  "size-8 rounded bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 items-center justify-center";

function FilterItem({
  name,
  onClick,
  selected,
}: {
  name: string;
  onClick: () => void;
  selected: boolean;
}) {
  return (
    <li>
      <button
        onClick={onClick}
        className={twMerge(
          selected ? "bg-primary text-white" : "bg-zinc-50 dark:bg-zinc-900",
          "rounded text-sm p-1 py-0.5",
        )}
      >
        {name}
      </button>
    </li>
  );
}
