import {
  SelectInput,
  SetFn,
  TextInput,
  useForm,
  useSelect,
  useTextInput,
} from "@/app/components";
import { useParentStore } from "@/app/zustand/useParentStore";
import { a, c } from "@/fn";
import { Parent, ParentPayload, parentRelationships } from "@/types";
import React, { useCallback, useMemo, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";

type Props = {
  S: SelectInput;
  N: TextInput;
  R: SelectInput;
  RI: TextInput;
  M: TextInput;
  isNew: boolean;
  setIsNew: SetFn<boolean>;
  selectedParents: Parent[];
  setSelectedParents: SetFn<Parent[]>;
};

const Component = ({
  M,
  N,
  R,
  S,
  isNew,
  setIsNew,
  RI,
  selectedParents,
  setSelectedParents,
}: Props) => {
  const { Form, SubmitArea, handler, isPending } = useForm();
  const { parents, create } = useParentStore();

  const onSubmit = useCallback(() => {
    if (isNew || parents.length === 0) {
      if (R.message) return a(R.message, R.showPicker);
      // if( R.value === '기타')
      if (N.message) return a(N.message, N.focus);
      if (M.message) return a(M.message, M.focus);
      const payload: ParentPayload = {
        mobile: M.value,
        name: N.value,
        relationship: R.value,
        studentIds: [],
      };
      handler(async () => {
        try {
          const parent = await create(payload);
          setSelectedParents((prev) => [parent, ...prev]);
          R.setValue("");
          N.setValue("");
          M.setValue("");

          c("계속해서 보호자를 추가하시겠습니까?", R.showPicker, () =>
            setIsNew(false),
          );
        } catch (error) {
          if (error instanceof Error) a(error.message);
        }
      });
    } else {
      // const found = parents.find( p => p.id === )
      console.log(parents);
    }
  }, [isNew, N, R, M, handler, parents, create, setIsNew, setSelectedParents]);
  return (
    <Form onSubmit={onSubmit}>
      {!isNew && parents.length > 0 ? (
        <>
          <S.Component
            {...S.props}
            data={[{ name: "신규", id: "신규" } as Parent, ...parents].map(
              (parent: Parent) => ({
                value: parent.id,
                title:
                  parent.id === "신규"
                    ? parent.name
                    : `[${parent.relationship}] ${parent.name} ${parent.mobile}`,
              }),
            )}
            onChange={(e) => {
              const id = e.target.value;
              if (id === "신규") return a(id);
              const parent = parents.find((p) => p.id === id);
              //   setSelectedParents(prev => )
              //   setSelectedParents((prev) =>
              //     !parent ? [parent, ...prev] : prev.filter((i) => i.id !== id),
              //   );
            }}
          />
          {selectedParents.length > 0 && (
            <ul>
              {selectedParents.map((parent) => (
                <li key={parent.id}>
                  <button
                    type="button"
                    className="w-full text-sm hover:text-red-500 p-1 hover:bg-zinc-50 rounded dark:hover:bg-zinc-900 items-center"
                    onClick={() => {
                      //   setSelectedLessons((prev) =>
                      //     prev.filter((i) => i.id !== lesson.id),
                      //   );
                      //   L.setValue("");
                      //   L.showPicker();
                    }}
                  >
                    <p className="flex-1 text-left">
                      {parent.id === "신규"
                        ? parent.name
                        : `[${parent.relationship}] ${parent.name} ${parent.mobile}`}
                    </p>
                    <IoTrashOutline />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <R.Component
                {...R.props}
                data={parentRelationships.map((value) => ({
                  value,
                  title: value,
                }))}
                label={{ children: "관계" }}
                containerClassName="w-25 text-sm"
                onSubmitEditing={N.focus}
              />
              <N.Component
                {...N.props}
                label={{ children: "보호자 성함" }}
                containerClassName="flex-1"
                messageShown={false}
              />
            </div>
            <M.Component
              {...M.props}
              label={{ children: "연락처" }}
              messageShown={false}
            />
          </div>
          <SubmitArea submit="추가" isPending={isPending} />
        </>
      )}
    </Form>
  );
};
const useParentForm = (p?: { payload?: Parent[] }) => {
  const N = useTextInput();
  const RI = useTextInput();
  const M = useTextInput();
  const S = useSelect();
  const R = useSelect();
  const [isNew, setIsNew] = useState(false);
  const [selectedParents, setSelectedParents] = useState(p?.payload ?? []);
  const props = useMemo<Props>(
    () => ({
      N,
      RI,
      M,
      S,
      R,
      isNew,
      selectedParents,
      setSelectedParents,
      setIsNew,
    }),
    [N, RI, M, S, R, isNew, selectedParents],
  );
  return {
    Component,
    props,
    selectedParents,
  };
};

export default useParentForm;
