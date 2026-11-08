"use client";

import { useForm, useSelect, useTextInput } from "@/app/components";
import { a, c } from "@/fn";
import { Student, StudentPayload } from "@/types";
import { getDateInputValue, lengthValidator } from "@/utils";
import { useCallback, useState } from "react";
import useJusoForm from "./JusoForm";
import useSchoolForm from "./useSchoolForm";
import useLessonForm from "./useLessonForm";
import useParentForm from "./useParentForm";

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
  const S = useSchoolForm();
  const L = useLessonForm();
  const P = useParentForm();

  const EA = useTextInput({
    value: getDateInputValue(payload?.enrolledAt ?? new Date().getTime()),
  }); //! Enrolled At
  const PD = useSelect({
    value: payload?.paymentDate
      ? payload.paymentDate.toString()
      : new Date().getDate().toString(),
  });
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
      <div className="flex flex-col gap-2 sm:flex-row max-w-200 mx-auto">
        <div className="w-full">
          <Add.Component {...Add.props} />
        </div>
        <div className="w-full">
          <S.Component {...S.props} />
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row max-w-200 mx-auto">
        <div className="w-full">
          <L.Component {...L.props} />
        </div>
        <div className="w-full">
          <P.Component {...P.props} />
        </div>
      </div>
      <Form className="sm:flex-row">
        <div className="gap-2 sm:flex-1 flex">
          <EA.Component
            {...EA.props}
            messageShown={false}
            containerClassName="flex-1"
            label={{ children: "원생등록일" }}
            type="date"
            onChange={(e) => {
              const date = parseInt(e.target.value.split("-")[2]);
              c(
                `결제일도 동일한 ${date}일로 하시겠습니까?`,
                () => PD.setValue(date.toString()),
                PD.showPicker,
              );
            }}
          />
          <PD.Component
            {...PD.props}
            label={{ children: "결제일" }}
            containerClassName="flex-1"
            data={Array.from({
              length: new Date(
                new Date().getFullYear(),
                new Date().getMonth() + 1,
                0,
              ).getDate(),
            }).map((_, i) => ({
              value: String(i + 1),
              title: i + 1 + "일",
            }))}
          />
        </div>
      </Form>
      <button onClick={() => console.log(P.selectedParents)}>check</button>
    </div>
  );
};

export default StudentForm;

console.log(new Date().getMonth());
console.log(
  new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDay(),
);
