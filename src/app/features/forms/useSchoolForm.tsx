import {
  SelectInput,
  TextInput,
  useForm,
  useSelect,
  useTextInput,
} from "@/app/components";
import { useSchoolStore } from "@/app/zustand";
import { useCallback, useMemo } from "react";

const useSchoolForm = () => {
  const schools = useSchoolStore((s) => s.schools);
  const S = useSelect({});
  const L = useTextInput({});
  const { Form } = useForm();
  type Props = { S: SelectInput; L: TextInput };
  const props = useMemo<Props>(() => ({ S, L }), [S, L]);

  const Component = useCallback(
    ({ S, L }: Props) => {
      return (
        <Form>
          <div>
            <S.Component
              label={{ children: "학교/직장 선택" }}
              {...S.props}
              data={schools.map((school) => ({
                value: school.id,
                title: school.name,
              }))}
            />
            <L.Component {...L.props} />
          </div>
        </Form>
      );
    },
    [schools, S],
  );
  return { Component };
};

export default useSchoolForm;
