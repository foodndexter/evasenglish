"use client";

import { useForm, useTextInput } from "@/app/components";
import { a } from "@/fn";
import { Student, StudentPayload } from "@/types";
import { getDateInputValue, lengthValidator } from "@/utils";
import { useCallback, useState } from "react";
import useJusoForm from "./JusoForm";

type Props = {
  payload?: Student;
  cancelHandler: () => void;
};
const StudentForm = ({ cancelHandler, payload }: Props) => {
  const [students, setStudents] = useState<StudentPayload[]>([]);

  const Name = useTextInput({
    value: payload?.name,
    validator: (v) => lengthValidator(v, "이름을 입력해주세요."),
  });
  const Dob = useTextInput({
    value: getDateInputValue(payload?.dob),
    validator: (v) => lengthValidator(v, "생년월일을 확인해주세요."),
  });
  const Mobile = useTextInput({
    value: payload?.mobile,
    validator: (v) => lengthValidator(v, "연락처를 입력해주세요."),
  });

  const Add = useJusoForm();

  const parents = [];
  const lessons = [];
  const schools = [];

  const EA = useTextInput(); //! Enrolled At
  const DA = useTextInput(); //! Discharged At

  const { Form, SubmitArea, handler, isPending } = useForm();

  const onSubmitBasic = useCallback(() => {
    if (Name.message) return a(Name.message, Name.focus);
    if (Dob.message) return a(Dob.message, Dob.focus);
    if (Mobile.message) return a(Mobile.message, Mobile.focus);

    if (!Add.props.juso)
      return a("주소를 확인해주세요.", Add.props.Keyword.focus);
    if (Add.props.juso.rest.length === 0)
      return a("상세 주소를 입력해주세요.", Add.props.Rest.focus);
  }, [Name, Dob, Mobile, Add]);
  return (
    <div className="space-y-2">
      <Form onSubmit={onSubmitBasic} className="border">
        <button className="hidden"></button>
        <div className="sm:flex-row gap-2 flex flex-col">
          <div className="flex gap-2">
            <Name.Component
              {...Name.props}
              containerClassName="flex-2"
              label={{ children: "이름" }}
            />
            <Dob.Component
              {...Dob.props}
              containerClassName="flex-1"
              label={{ children: "생년월일" }}
              type="date"
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
          <Mobile.Component
            {...Mobile.props}
            label={{ children: "연락처" }}
            containerClassName="flex-1"
            type="tel"
          />
        </div>
      </Form>
      <Add.Component {...Add.props} />
    </div>
  );
};

export default StudentForm;
