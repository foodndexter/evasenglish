"use client";

import { useForm, useSelect, useTextInput } from "@/app/components";
import { useSchoolStore } from "@/app/zustand";
import { a, c } from "@/fn";
import { School, SchoolPayload, schoolSorts } from "@/types";
import { lengthValidator } from "@/utils";
import { useCallback } from "react";

type Props = {
  payload?: School;
  isAdmin?: boolean;
  cancelHandler?: () => void;
};
const SchoolForm = ({ isAdmin, payload, cancelHandler }: Props) => {
  const { Form, handler, isPending, SubmitArea } = useForm();
  const Sort = useSelect({
    value: payload?.sort,
    validator: (value) => lengthValidator(value, "분류를 선택해주세요."),
  });
  const Desc = useSelect({});
  const Name = useTextInput({
    value: payload?.name,
    validator: (value) =>
      lengthValidator(value, "학교/직장 이름을 입력해주세요."),
  });

  const onSubmit = useCallback(() => {
    if (Sort.message) return a(Sort.message, Sort.focus);
    if (Name.message) return a(Name.message, Name.focus);

    const p: SchoolPayload = {
      sort: Sort.value,
      name: Name.value,
      description: Desc.value ?? null,
    };

    handler(async () => {
      if (payload) {
        await useSchoolStore.getState().put({ ...payload, ...p });
        if (cancelHandler) cancelHandler();
      } else {
        await useSchoolStore.getState().create(p);
        c(
          "추가되었습니다. 계속해서 새로운 학교를 등록하시겠습니까?",
          () => {
            Sort.setValue("");
            Name.setValue("");
            Desc.setValue("");
            Sort.showPicker();
          },
          cancelHandler,
        );
      }
    });
  }, [Sort, Name, payload, handler, Desc, cancelHandler]);

  return (
    <Form onSubmit={onSubmit}>
      <div className="flex">
        <Sort.Component
          {...Sort.props}
          data={schoolSorts.map((sort) => ({ title: sort, value: sort }))}
          messageShown={false}
          label={{ children: "분류" }}
          onSubmitEditing={Name.focus}
        />
      </div>
      <Name.Component
        {...Name.props}
        label={{ children: "학교/직장 이름" }}
        readOnly={isPending}
        placeholder="학교/직장 이름 입력"
      />
      {!isAdmin && (
        <Desc.Component
          {...Desc.props}
          data={["1", "2", "3"].map((value) => ({
            title: value + "학년",
            value,
          }))}
        />
      )}
      <SubmitArea
        isPending={isPending}
        onCancel={() =>
          c(
            "취소하시면 작업한 내용은 사라집니다. 취소하시겠습니까?",
            () => cancelHandler && cancelHandler(),
          )
        }
      />
    </Form>
  );
};

export default SchoolForm;
