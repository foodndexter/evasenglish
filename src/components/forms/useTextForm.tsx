"use client";
import { useCallback, useId, useMemo, useState } from "react";
import useForm from "./useForm";
import { SetFn, TextInput, useTextInput } from "./useTextInput";
import Button from "./Button";
import { IoAdd } from "react-icons/io5";
import { a } from "@/fn";

type Props = {
  Text: TextInput;
  label?: string;
  data: string[];
  setData: SetFn<string[]>;
};
const Component = ({ Text, data, setData }: Props) => {
  const { Form } = useForm();
  const onSubmit = useCallback(() => {
    const value = Text.value;
    if (Text.message) return a(Text.message, Text.focus);
    const found = data.some((text) => text === value);
    if (found) {
      setData((prev) => prev.filter((text) => text !== value));
    } else {
      setData((prev) => [value, ...prev]);
    }
    Text.setValue("");
    Text.focus();
  }, [setData, Text, data]);
  return (
    <Form onSubmit={onSubmit}>
      <div className="flex gap-2">
        <Text.Component
          {...Text.props}
          containerClassName="flex-1"
          messageShown={false}
          placeholder="이곳에 입력해주세요."
        />
        <Button isPrimary className="size-10" type="submit">
          <IoAdd />
        </Button>
      </div>
      {data.length === 0 ? (
        <Button
          isTouchable
          className="border h-20 text-zinc-500"
          onClick={Text.focus}
        >
          Add DATA
        </Button>
      ) : (
        <>
          <ul className="flex flex-wrap gap-1">
            {data.map((text) => (
              <li key={text}>
                <Button
                  onClick={() => {
                    setData((prev) => prev.filter((t) => t !== text));
                    if (data.length === 1) Text.focus();
                  }}
                  isTouchable
                  isItem
                  className="border"
                >
                  {text}
                </Button>
              </li>
            ))}
          </ul>
          <Button isPrimary type="button">
            완료
          </Button>
        </>
      )}
    </Form>
  );
};
const useTextForm = () => {
  const Text = useTextInput();
  const [data, setData] = useState<string[]>([]);
  const props = useMemo(() => ({ Text, data, setData }), [Text, data]);
  const id = useId();
  const Trigger = useCallback(
    ({
      handler,
      button,
      title,
    }: {
      title?: string;
      button?: string;
      handler: () => void;
    }) => (
      <div className="space-y-1">
        {title && (
          <label htmlFor={id} className="text-zinc-500 text-xs">
            {title}
          </label>
        )}
        <div className="flex gap-2 items-start">
          {data.length === 0 ? (
            <Button
              isTouchable
              className="flex-1 text-xs border h-6"
              onClick={handler}
            >
              {button ?? "Add text"}
            </Button>
          ) : (
            <ul className="border flex-1 flex flex-wrap">
              {data?.map((text) => (
                <li key={text}>
                  <Button isTouchable>{text}</Button>
                </li>
              ))}
            </ul>
          )}
          <Button isPrimary className="size-6" onClick={handler}>
            <IoAdd />
          </Button>
        </div>
      </div>
    ),
    [id, data],
  );
  return { Component, props, data, setData, Trigger };
};

export default useTextForm;
