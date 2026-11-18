"use client";

import { useCallback, useEffect, useState } from "react";
import { useToggle } from "./components";
import { StudentForm } from "./features";
import {
  Filter,
  filters,
  useFilterStore,
  useLessonStore,
  useMemoStore,
  useParentStore,
  useSchoolStore,
  useStudentStore,
} from "./zustand";
import { IoAdd, IoFilterOutline } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import { Lesson, Memo, Parent, Payment, School, Student } from "@/types";
import StudentLi from "./StudentLi";

const HomePage = () => {
  const M = useToggle();
  const { students, rawStudents } = useStudentStore();
  const [data, setData] = useState(students);
  const lessons = useLessonStore((l) => l.lessons);
  const schools = useSchoolStore((s) => s.schools);
  const parents = useParentStore((p) => p.parents);
  const memos = useMemoStore((m) => m.memos);

  const [isIcon, setIsIcon] = useState(false);
  const [numOfRow, setNumOfRow] = useState(1);
  const nrHandler = useCallback(
    () => setNumOfRow((prev) => (prev < 4 ? prev + 1 : 1)),
    [],
  );
  const F = useToggle();
  const { filter, filterHandler } = useFilterStore();

  useEffect(() => {
    console.log(filter);
    const fn = () => {
      if (students.length > 0) {
        console.log(students);
      }
      const array: Student[] = [];
      rawStudents.map((student) => {
        const ps: Parent[] = [];
        const ss: School[] = [];
        const ls: Lesson[] = [];
        const pms: Payment[] = [];
        const ms: Memo[] = [];
        student.lessons.map((id) => {
          const lesson = lessons.find((lesson) => lesson.id === id);
          if (lesson) ls.push(lesson);
        });
        student.schools.map(({ id, description }) => {
          const school = schools.find((school) => school.id === id);
          if (school) ss.push({ ...school, description });
        });
        student.parents.map((id) => {
          const parent = parents.find((parent) => parent.id === id);
          if (parent) ps.push(parent);
        });
        student.memos.map((id) => {
          const memo = memos.find((memo) => memo.id === id);
          if (memo) ms.push(memo);
        });
        array.push({
          ...student,
          parents: ps,
          lessons: ls,
          schools: ss,
          memos: ms,
          payments: pms,
        });
      });

      if (filter.target === "클래스") {
        array.map((student, index) => {
          if (!student.lessons.some((lesson) => lesson.id === filter.value))
            return array.splice(index, 1);
        });
      } else if (filter.target === "학교") {
        array.map((student, index) => {
          if (!student.schools.some((school) => school.id === filter.value))
            return array.splice(index, 1);
        });
      }
      console.log(
        array.sort((a, b) => {
          switch (filter.target) {
            case "결제일":
              const isAsec =
                typeof filter.value === "string" && filter.value === "asec";

              if (a.paymentDate > b.paymentDate) return isAsec ? -1 : 1;

              if (a.paymentDate === b.paymentDate) return 0;

              if (a.paymentDate < b.paymentDate) return isAsec ? 1 : -1;

            default:
              return 0;
          }
        }),
      );

      setData(array);
    };

    fn();
    return () => {
      fn();
    };
  }, [students, lessons, rawStudents, schools, parents, memos, filter]);

  const onClickFilter = useCallback(
    (target: Filter["target"] | null, value: string | null) => {
      if (!value || !target) return filterHandler(null, null);
      if (filter.value === value) {
        filterHandler(null, null);
      } else {
        filterHandler(target, value);
      }
      F.handler();
    },
    [filterHandler, F, filter],
  );

  return (
    <main>
      {F.toggled && (
        <F.Modal>
          <F.ModalBase className="p-2">
            <ul className="space-y-2">
              {filters.map((f, index) => (
                <li key={index} className="space-y-1">
                  <p className="font-bold text-xs">{f.target}</p>
                  <ul className="flex gap-2 flex-wrap">
                    {f.target === "클래스"
                      ? lessons.map((lesson) => (
                          <FilterItem
                            key={lesson.id}
                            {...lesson}
                            onClick={() => onClickFilter(f.target, lesson.id)}
                            selected={
                              filter.target === "클래스" &&
                              lesson.id === filter.value
                            }
                          />
                        ))
                      : f.target === "학교"
                        ? schools.map((school) => (
                            <FilterItem
                              key={school.id}
                              {...school}
                              onClick={() => onClickFilter(f.target, school.id)}
                              selected={
                                filter.target === "학교" &&
                                school.id === filter.value
                              }
                            />
                          ))
                        : f.items.map((item, i) => (
                            <FilterItem
                              key={i}
                              {...item}
                              onClick={() =>
                                onClickFilter(f.target, item.value)
                              }
                              selected={
                                filter.target === f.target &&
                                item.value === filter.value
                              }
                            />
                          ))}
                  </ul>
                </li>
              ))}
            </ul>
          </F.ModalBase>
        </F.Modal>
      )}
      <div className="flex items-center  border-b pb-2">
        <p className="flex-1">학생관리: {data.length}명</p>
        <div className="flex gap-2">
          <button
            className={twMerge(base, filter.value && "w-auto gap-2 px-2")}
            onClick={F.handler}
          >
            <IoFilterOutline />
            {filter.value && (
              <p className="text-xs">
                {filter.target}:{" "}
                {typeof filter.value === "string" && filter.value === "dscd"
                  ? "내림차순"
                  : filter.value === "ascd"
                    ? "오름차순"
                    : filter.target === "클래스"
                      ? lessons.find((lesson) => lesson.id === filter.value)
                          ?.name
                      : filter.target === "학교"
                        ? schools.find((school) => school.id === filter.value)
                            ?.name
                        : filter.value}
              </p>
            )}
          </button>
          {!isIcon && (
            <button
              className={twMerge(base, "p-1 gap-0.5 flex-wrap")}
              onClick={nrHandler}
            >
              {Array.from({ length: numOfRow }).map((_, i) => (
                <span
                  key={i}
                  className={twMerge(
                    "size-full border rounded-xs",
                    numOfRow > 1 && "max-w-2.5",
                    numOfRow > 2 && "h-2.5",
                  )}
                />
              ))}
            </button>
          )}
          <button className={twMerge(base)} onClick={M.handler}>
            <IoAdd />
          </button>
        </div>
      </div>
      <ul>
        {data.map((student, index) => (
          <StudentLi
            key={student.id}
            {...student}
            index={index}
            isIcon={isIcon}
            numOfRow={numOfRow}
          />
        ))}
      </ul>
      <button onClick={M.handler}>open modal</button>
      {M.toggled && (
        <M.Modal>
          <M.ModalBase className="p-2">
            <StudentForm cancelHandler={M.handler} />
          </M.ModalBase>
        </M.Modal>
      )}
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
