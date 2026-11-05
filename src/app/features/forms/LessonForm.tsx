"use client";

import { useForm, useSelect, useTextInput } from "@/app/components";
import { useBizStore, useLessonStore } from "@/app/zustand";
import { a, c } from "@/fn";
import { Lesson, LessonPayload, LessonSort, lessonSorts } from "@/types";
import { lengthValidator } from "@/utils";
import { useCallback } from "react";

type Props = {
  cancelHandler: () => void;
  payload?: Lesson;
};
const LessonForm = ({ cancelHandler, payload }: Props) => {
  const { Form, SubmitArea, handler, isPending } = useForm();
  const biz = useBizStore((b) => b.biz);

  const Sort = useSelect({
    value: payload?.sort,
    validator: (v) => lengthValidator(v, "분류를 선택해주세요."),
  });
  const Sub = useSelect({
    value: payload?.subject ?? biz?.subjects[0],
    validator: (v) => lengthValidator(v, "수강과목을 선택해주세요."),
  });
  const Name = useTextInput({
    value: payload?.name,
    validator: (v) => lengthValidator(v, "클래스 이름을 입력해주세요."),
  });
  const Length = useSelect({
    value: payload?.lengthPerLesson.toString(),
    validator: (v) => lengthValidator(v, "수업 시간을 선택해주세요."),
  });
  const Price = useTextInput({
    value: payload?.price.toString(),
    validator: (v) => lengthValidator(v, "클래스 수업료를 입력해주세요."),
  });
  const Count = useSelect({
    value: payload?.countPerWeek.toString(),
    validator: (v) => lengthValidator(v, "수업 횟수를 선택해주세요."),
  });
  console.log(payload);

  const onSubmit = useCallback(() => {
    if (Sort.message) return a(Sort.message, Sort.showPicker);
    if (Count.message) return a(Count.message, Count.showPicker);
    if (Length.message) return a(Length.message, Length.showPicker);
    if (Name.message) return a(Name.message, Name.focus);
    if (Price.message) return a(Price.message, Price.focus);

    handler(async () => {
      const p: LessonPayload = {
        sort: Sort.value as LessonSort,
        countPerWeek: parseInt(Count.value),
        lengthPerLesson: parseInt(Length.value),
        price: parseInt(Price.value),
        name: Name.value,
        subject: Sub.value,
      };

      if (payload) {
        await useLessonStore.getState().put({ ...payload, ...p });
        a("수정되었습니다.", cancelHandler);
        return;
      }
      await useLessonStore.getState().create(p);
      c(
        "추가되었습니다. 계속해서 클래스를 추가하시겠습니까?",
        () => {
          Sort.setValue("");
          Count.setValue("");
          Length.setValue("");
          Name.setValue("");
          Sub.setValue(biz?.subjects[0] ?? "");
          Price.setValue("");
          Sort.showPicker();
        },
        cancelHandler,
      );
    });
  }, [
    Name,
    Sort,
    Count,
    Length,
    Price,
    handler,
    payload,
    Sub,
    cancelHandler,
    biz,
  ]);

  const onCancel = useCallback(() => {
    if (cancelHandler)
      return c(
        "취소하시면 처음부터 다시 작성해야합니다. 작성을 멈추시겠습니까?",
        cancelHandler,
      );
  }, [cancelHandler]);
  if (!biz) return null;
  return (
    <Form className="min-w-50" onSubmit={onSubmit}>
      <div className="flex gap-2">
        <Sort.Component
          {...Sort.props}
          data={lessonSorts.map((value) => ({ value, title: value }))}
          label={{ children: "분류" }}
          onSubmitEditing={Count.showPicker}
        />
        <Count.Component
          {...Count.props}
          data={Array.from({ length: 14 }).map((_, i) => ({
            value: (i + 1).toString(),
            title: `${i + 1}회`,
          }))}
          label={{ children: "횟수/주" }}
          onSubmitEditing={Length.showPicker}
        />
        <Length.Component
          {...Length.props}
          data={Array.from({ length: 100 }).map((_, i) => ({
            value: ((i + 1) * 5).toString(),
            title: `${(i + 1) * 5}분`,
          }))}
          label={{ children: "시간/분" }}
          onSubmitEditing={Name.focus}
        />
      </div>
      <div className="flex gap-2">
        <Sub.Component
          {...Sub.props}
          data={biz.subjects.map((value) => ({ value, title: value }))}
          label={{ children: "수강과목" }}
        />
        <Name.Component
          {...Name.props}
          label={{ children: "클래스 이름" }}
          placeholder={payload?.name}
        />
      </div>
      <div>
        <Price.Component
          {...Price.props}
          label={{ children: "클래스 수업료" }}
          placeholder={payload?.price.toFixed().toString()}
        />
      </div>
      <SubmitArea isPending={isPending} onCancel={onCancel} />
    </Form>
  );
};

export default LessonForm;
