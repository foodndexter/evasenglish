import {
  SetFn,
  TextInput,
  useForm,
  useTextInput,
  useToggle,
} from "@/components";
import { a } from "@/fn";
import { Memo, MemoPayload } from "@/types";
import { useCallback, useMemo, useState } from "react";
import { IoDuplicateOutline, IoTrashOutline } from "react-icons/io5";

const useMemoForm = (p?: { payload: Memo[] }) => {
  const [memos, setMemos] = useState<(MemoPayload | Memo)[]>(p?.payload ?? []);
  const T = useTextInput();
  const M = useTextInput();
  const [isImportant, setIsImportant] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const props = useMemo<Props>(
    () => ({
      T,
      M,
      isImportant,
      setIsImportant,
      memos,
      setMemos,
      isAdding,
      setIsAdding,
    }),
    [T, M, isImportant, memos, isAdding],
  );

  return { Component: MemoForm, props, memos, setMemos };
};

type Props = {
  T: TextInput;
  M: TextInput;
  payload?: Memo;
  isImportant: boolean;
  setIsImportant: SetFn<boolean>;
  memos: MemoPayload[];
  setMemos: SetFn<MemoPayload[]>;
  isAdding: boolean;
  setIsAdding: SetFn<boolean>;
};
const MemoForm = ({
  M,
  T,
  isImportant,
  memos,
  setIsImportant,
  setMemos,
  payload,
  isAdding,
  setIsAdding,
}: Props) => {
  const { Form, SubmitArea } = useForm();

  const S = useToggle();

  const onSubmit = useCallback(() => {
    let payload: MemoPayload = {
      description: M.value,
      isImportant: isImportant ? memos.length + 1 : null,
      studentId: "",
      title: T.value,
    };
    if (T.message) {
      if (confirm(`${T.message}. 제목을 생략하시겠습니까?`)) {
        console.log("canceled");
      } else {
        return T.focus();
      }
    }
    if (M.message) return a(M.message, M.focus);

    setMemos((prev) => [payload, ...prev]);
    T.setValue("");
    M.setValue("");
    setIsAdding(false);
    setIsAdding(false);
  }, [T, M, isImportant, memos]);
  return (
    <Form className="w-full" onSubmit={onSubmit}>
      {isAdding ? (
        <>
          <div className="space-y-2">
            <div className="flex gap-2 items-start">
              <T.Component
                {...T.props}
                label={{ children: "메모 제목" }}
                messageShown={false}
                containerClassName="flex-1"
              />
              <S.Switch
                handler={() => setIsImportant((prev) => !prev)}
                state={isImportant}
                label="중요"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500" htmlFor={M.props.id}>
                메모 내용
              </label>
              <textarea
                value={M.props.value}
                onChange={(e) => M.props.setValue(e.target.value)}
                id={M.props.id}
                className="border p-2 rounded border-zinc-200 outline-none resize-none h-25 text-sm focus:border-primary dark:border-zinc-700 dark:bg-zinc-900 bg-zinc-50"
              />
            </div>
          </div>
          <SubmitArea
            onCancel={() => {
              setIsAdding(false);
              T.setValue("");
              M.setValue("");
            }}
          />
        </>
      ) : (
        <>
          <label htmlFor="memo-section" className="text-zinc-500 text-xs">
            메모
          </label>
          {memos.length > 0 ? (
            <ul className="grid grid-cols-2 md-mobile:grid-cols-3 sm:grid-cols-4 gap-2 items-start">
              {memos.map((m, i) => (
                <li key={i} className="flex gap-2 items-center">
                  <div className="flex-1 rounded p-1 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800">
                    {m.title && m.title?.length > 0 && (
                      <p className="text-xs font-bold border-b border-zinc-200 dark:border-zinc-700 pb-1">
                        {m.title}
                      </p>
                    )}
                    <p className="text-sm line-clamp-3">{m.description}</p>
                  </div>
                  <button
                    type="button"
                    className="text-xs p-1 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:text-red-500"
                    onClick={() =>
                      setMemos((prev) => prev.filter((_, index) => index !== i))
                    }
                  >
                    <IoTrashOutline />
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setIsAdding(true);
                    T.focus();
                  }}
                  className="text-lg hover:text-primary p-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-primary size-8  rounded-full items-center justify-center mx-auto"
                >
                  <IoDuplicateOutline />
                </button>
              </li>
            </ul>
          ) : (
            <button
              type="button"
              onClick={() => setIsAdding(true)}
              className="border border-border rounded justify-center py-10"
            >
              Write A Memo
            </button>
          )}
        </>
      )}
    </Form>
  );
};

export default useMemoForm;
