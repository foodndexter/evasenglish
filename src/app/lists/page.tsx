"use client";

import { useMemo, useState } from "react";
import { useLessonStore, useSchoolStore } from "../zustand";
import { useToggle } from "../components";
import { LessonForm, SchoolForm } from "../features";
import {
  IoAddCircleOutline,
  IoCheckbox,
  IoSquareOutline,
} from "react-icons/io5";
import { c } from "@/fn";

type Item = {
  title: string;
  onClick: () => void;
  data: LiProps[];
  handler: (index: number) => void;
};

const ListPage = () => {
  const lessons = useLessonStore((l) => l.lessons);
  const schools = useSchoolStore((l) => l.schools);
  const L = useToggle();
  const S = useToggle();
  const [lSelection, setLSelection] = useState(lessons.map(() => false));
  const [sSelection, setSSelection] = useState(schools.map(() => false));
  const items = useMemo<Item[]>(
    () => [
      {
        title: "클래스목록",
        data: lessons,
        onClick: L.handler,
        handler: (index: number) =>
          setLSelection((prev) => {
            const copy = [...prev];
            copy[index] = !copy[index];
            return copy;
          }),
      },
      {
        title: "학교목록",
        data: schools,
        onClick: S.handler,
        handler: (index: number) =>
          setSSelection((prev) => {
            const copy = [...prev];
            copy[index] = !copy[index];
            return copy;
          }),
      },
    ],
    [lessons, schools, L, S],
  );

  return (
    <div className="grid gap-4 md-mobile:grid-cols-2">
      {items.map((item) => {
        const isSchool = item.title === "학교목록";
        const onDeleteAll = () => {
          c("삭제하면 복구가 불가능합니다. 삭제하시겠습니까?", async () => {
            const ids: string[] = [];
            if (isSchool) {
              sSelection.map((selected, index) => {
                if (selected) {
                  ids.push(schools[index].id);
                }
              });
              await useSchoolStore.getState().deleteMany(ids);
              setSSelection(schools.map(() => false));
            } else {
              lSelection.map(
                (selected, index) => selected && ids.push(lessons[index].id),
              );
              await useLessonStore.getState().deleteMany(ids);
              setLSelection(schools.map(() => false));
            }
          });
        };
        return (
          <section key={item.title}>
            <div className="flex">
              <h1 className="flex-1">{item.title}</h1>
              <div className="flex gap-2 text-xs">
                {(isSchool
                  ? sSelection.some((item) => item === true)
                  : lSelection.some((i) => i === true)) && (
                  <>
                    <button
                      onClick={() =>
                        isSchool
                          ? setSSelection(schools.map(() => false))
                          : setLSelection(lessons.map(() => false))
                      }
                    >
                      전체선택해제
                    </button>
                    <button onClick={onDeleteAll}>선택삭제</button>
                  </>
                )}
                <button
                  onClick={() => (isSchool ? S.handler() : L.handler())}
                  className="text-lg"
                >
                  <IoAddCircleOutline />
                </button>
              </div>
            </div>
            {item.data.length > 0 ? (
              <ul>
                {item.data.map((d, index) => (
                  <Li
                    {...d}
                    key={d.id}
                    selected={isSchool ? sSelection[index] : lSelection[index]}
                    handler={() => {
                      console.log("selecting", lSelection);
                      item.handler(index);
                    }}
                    isSchool={isSchool}
                  />
                ))}
              </ul>
            ) : (
              <button
                onClick={item.onClick}
                className="w-full justify-center py-10 rounded text-zinc-500 bg-zinc-100 dark:bg-zinc-900 mt-2 text-xs"
              >
                이곳을 눌러 항목을 추가하세요.
              </button>
            )}
          </section>
        );
      })}
      {L.toggled && (
        <L.Modal>
          <L.ModalBase>
            <LessonForm cancelHandler={L.handler} />
          </L.ModalBase>
        </L.Modal>
      )}
      {S.toggled && (
        <S.Modal>
          <S.ModalBase>
            <SchoolForm isAdmin cancelHandler={S.handler} />
          </S.ModalBase>
        </S.Modal>
      )}
    </div>
  );
};

export default ListPage;

// export const instant = false;
type LiProps = { id: string; sort: string; name: string };
function Li({
  sort,
  name,
  selected,
  handler,
  isSchool,
  ...props
}: LiProps & {
  selected: boolean;
  handler: () => void;
  isSchool: boolean;
}) {
  const M = useToggle();
  return (
    <li className="flex gap-2 items-center hover:bg-zinc-50 dark:hover:bg-zinc-900">
      <button className="" onClick={handler}>
        {selected ? (
          <IoCheckbox className="text-primary" />
        ) : (
          <IoSquareOutline />
        )}
      </button>
      <button className="gap-2" onClick={M.handler}>
        [{sort}] <b>{name}</b>
      </button>
      {M.toggled && (
        <M.Modal>
          <M.ModalBase>
            {isSchool ? (
              <SchoolForm
                cancelHandler={M.handler}
                payload={{ ...props, sort, name } as any}
                isAdmin
              />
            ) : (
              <LessonForm
                cancelHandler={M.handler}
                payload={{ ...props, sort, name } as any}
              />
            )}
          </M.ModalBase>
        </M.Modal>
      )}
    </li>
  );
}
