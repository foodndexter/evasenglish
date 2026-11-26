import {
  SelectInput,
  TextInput,
  useForm,
  useSelect,
  useTextInput,
} from "@/app/components";
// import { useSchoolStore } from "@/app/zustand";
import { a, c } from "@/fn";
import { School } from "@/types";
import { useCallback, useMemo, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";

const useSchoolForm = (payload?: School[]) => {
  // const schools = useSchoolStore((s) => s.schools);
  const schools: School[] = [];
  const S = useSelect({});
  const SL = useSelect({});
  const L = useTextInput({});
  const { Form, SubmitArea } = useForm();
  type Props = { S: SelectInput; L: TextInput; SL: SelectInput };
  const props = useMemo<Props>(() => ({ S, L, SL }), [S, L, SL]);

  const [selectedSchools, setSelectedSchools] = useState<School[]>(
    payload ?? [],
  );

  const Component = useCallback(
    ({ S, L, SL }: Props) => {
      const onSubmit = () => {
        const school = schools.find((s) => s.id === S.value);
        if (!school) return a("No such school!");
        setSelectedSchools((prev) => {
          const some = prev.some((s) => s.id === school.id);
          return some
            ? prev.filter((s) => s.id !== school.id)
            : [{ ...school, description: SL.value }, ...prev];
        });
        S.setValue("");
        SL.setValue("");
        c("계속 추가하시겠습니까?", S.showPicker);
      };
      return (
        <Form onSubmit={onSubmit}>
          <div className="flex gap-2 items-end">
            <S.Component
              label={{ children: "학교/직장 선택" }}
              {...S.props}
              data={schools.map((school) => ({
                value: school.id,
                title: school.name,
              }))}
              onSubmitEditing={SL.showPicker}
            />

            {SL.value === "직접입력" ? (
              <L.Component
                {...L.props}
                label={{ children: "학년/직책" }}
                onReset={() => {
                  SL.setValue("");
                  SL.showPicker();
                }}
                containerClassName="flex-1"
              />
            ) : (
              <SL.Component
                {...SL.props}
                label={{ children: "학년/직책" }}
                data={[
                  "1학년",
                  "2학년",
                  "3학년",
                  "4학년",
                  "5학년",
                  "6학년",
                  "직접입력",
                ].map((title) => ({ title, value: title }))}
                onChange={(e) => {
                  const v = e.target.value;
                  if (v === "직접입력") {
                    L.focus();
                  }
                }}
              />
            )}
            <button className="bg-primary text-white h-10 rounded items-center px-4">
              추가
            </button>
          </div>
          {selectedSchools.length > 0 && (
            <ul>
              {selectedSchools.map((school) => (
                <li key={school.id}>
                  <button
                    type="button"
                    className="p-1 text-sm w-full items-center dark:bg-zinc-900 rounded hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-red-500"
                    onClick={() =>
                      setSelectedSchools((prev) =>
                        prev.filter((s) => s.id !== school.id),
                      )
                    }
                  >
                    <p className="flex-1 text-left">
                      {school.name} {school.description}
                    </p>
                    <IoTrashOutline />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Form>
      );
    },
    [schools, Form, selectedSchools],
  );
  return { Component, props, selectedSchools, setSelectedSchools };
};

export default useSchoolForm;
