import {
  SelectInput,
  TextInput,
  useForm,
  useSelect,
  useTextInput,
} from "@/app/components";
import { useSchoolStore } from "@/app/zustand";
import { School } from "@/types";
import { useCallback, useMemo } from "react";

const useSchoolForm = () => {
  const schools = useSchoolStore((s) => s.schools);
  const S = useSelect({});
  const SL = useSelect({});
  const L = useTextInput({});
  const { Form } = useForm();
  type Props = { S: SelectInput; L: TextInput; SL: SelectInput };
  const props = useMemo<Props>(() => ({ S, L, SL }), [S, L, SL]);

  const value = useMemo<School | null>(() => {
    const school = schools.find((item) => item.id === S.value);
    if (!school) return null;
    return {
      ...school,
      description: SL.value === "직접입력" ? L.value : SL.value,
    };
  }, [S, L, schools, SL]);

  const Component = useCallback(
    ({ S, L, SL }: Props) => {
      return (
        <Form>
          <div className="flex gap-2">
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
          </div>
        </Form>
      );
    },
    [schools, Form],
  );
  return { Component, props, value };
};

export default useSchoolForm;
