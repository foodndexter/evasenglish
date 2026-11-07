"use client";

import { SelectInput, SetFn, useForm, useSelect } from "@/app/components";
import { useLessonStore } from "@/app/zustand";
import { Lesson } from "@/types";
import { useMemo, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";

type Props = {
  L: SelectInput;
  selectedLessons: Lesson[];
  setSelectedLessons: SetFn<Lesson[]>;
};

const Component = ({ L, selectedLessons, setSelectedLessons }: Props) => {
  const lessons = useLessonStore((l) => l.lessons);
  const { Form } = useForm();
  return (
    <Form>
      <L.Component
        {...L.props}
        label={{ children: "수강 클래스" }}
        // onSubmitEditing={() => L.setValue('')}
        onChange={(e) => {
          const id = e.target.value;
          setSelectedLessons((prev) => {
            if (prev.some((i) => i.id === id)) {
              return prev.filter((i) => i.id !== id);
            }
            const lesson = lessons.find((i) => i.id === id);
            if (!lesson) return prev;
            return [...prev, lesson];
          });
          L.setValue("");
        }}
        data={lessons.map((lesson) => ({
          value: lesson.id,
          title: lesson.name,
        }))}
      />
      {selectedLessons.length > 0 && (
        <ul>
          {selectedLessons.map((lesson) => (
            <li key={lesson.id}>
              <button
                type="button"
                className="w-full text-sm hover:text-red-500 p-1 hover:bg-zinc-50 rounded dark:hover:bg-zinc-900 items-center"
                onClick={() => {
                  setSelectedLessons((prev) =>
                    prev.filter((i) => i.id !== lesson.id),
                  );
                  L.setValue("");
                  L.showPicker();
                }}
              >
                <p className="flex-1 text-left">
                  {lesson.sort} {lesson.name}
                </p>
                <IoTrashOutline />
              </button>
            </li>
          ))}
        </ul>
      )}
    </Form>
  );
};

export default function useLessonForm(p?: { payload?: Lesson[] }) {
  const [selectedLessons, setSelectedLessons] = useState<Lesson[]>(
    p?.payload ?? [],
  );
  const L = useSelect();
  const props = useMemo<Props>(
    () => ({ L, selectedLessons, setSelectedLessons }),
    [L, selectedLessons],
  );

  return { Component, selectedLessons, props };
}
