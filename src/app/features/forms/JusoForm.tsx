"use client";

import { TextInput, useForm, useTextInput } from "@/app/components";
import { a } from "@/fn";
import {
  filterJuso,
  getJusoResultCommon,
  Juso,
  JusoResultCommon,
  JusoResultProps,
} from "@/types";
import { lengthValidator } from "@/utils";
import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { CgSpinner } from "react-icons/cg";
import { IoChevronDown, IoSearch } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

type Props = {
  juso: Juso | null;
  setJuso: Dispatch<SetStateAction<Juso | null>>;
  Keyword: TextInput;
  Rest: TextInput;
};
const Component = ({ Keyword, juso, setJuso, Rest }: Props) => {
  const { Form, isPending, handler } = useForm();
  const [hasSearched, setHasSearched] = useState(false);
  const [data, setData] = useState<JusoResultProps[][]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  // const [totalCount, setTotalCount] = useState(0);
  const [savedKeyword, setSavedKeyword] = useState("");
  const [hasSaved, setHasSaved] = useState(false);

  const queryFn = useCallback(async () => {
    await fetch("/api/juso", {
      body: JSON.stringify({
        keyword: Keyword.value,
        currentPage: Keyword.value !== savedKeyword ? 1 : currentPage,
      }),
      method: "POST",
    }).then((res) =>
      res
        .json()
        .then(
          ({
            common,
            juso: jusos,
          }: {
            common: JusoResultCommon;
            juso: JusoResultProps[];
          }) => {
            setJuso(null);
            setHasSaved(false);

            const { totalCount, currentPage, countPerPage } =
              getJusoResultCommon(common);
            setHasNextPage(totalCount - countPerPage * currentPage > 0);
            setCurrentPage(currentPage + 1);
            // setTotalCount(totalCount);
            if (savedKeyword === Keyword.value) {
              setData((prev) => [...prev, jusos]);
            } else setData([jusos]);
            setHasSearched(true);
            setSavedKeyword(Keyword.value);
          },
        ),
    );
  }, [savedKeyword, Keyword.value, currentPage, setJuso]);

  const onFetchMore = useCallback(() => {
    handler(async () => {
      await queryFn().then(() => {
        const ul = ref.current;
        if (!ul) return;
        const top = 400 * currentPage;

        ul.scrollTo({ top, behavior: "smooth" });
      });
    });
  }, [currentPage, queryFn, handler]);

  const onSearch = useCallback(() => {
    if (Keyword.message) return a(Keyword.message, Keyword.focus);

    handler(async () => {
      await queryFn();
    });
  }, [Keyword, handler, queryFn]);

  const ref = useRef<HTMLUListElement>(null);

  const onSubmit = useCallback(() => {
    if (!juso) return;
    if (Rest.message) return a(Rest.message, Rest.focus);
    const finalJuso = { ...juso, rest: Rest.value };
    setJuso(finalJuso);
    setHasSaved(true);
  }, [juso, Rest, setJuso]);

  const onResetAndSearch = useCallback(() => {
    setJuso(null);
    Rest.setValue("");
    setTimeout(Keyword.focus, 200);
  }, [setJuso, Keyword, Rest]);

  return (
    <Form className="border" onSubmit={juso ? onSubmit : onSearch}>
      {juso ? (
        hasSaved ? (
          <div className="flex gap-2 items-end">
            <Rest.Component
              {...Rest.props}
              value={juso.roadAddr + ", " + juso.rest}
              // resetHidden
              containerClassName="flex-1"
              label={{ children: "주소" }}
              className="text-sm"
              ResetIcon={AiOutlineEdit}
              resetClassName="text-xs rounded-full bg-zinc-400 hover:bg-zinc-500 dark:bg-zinc-600 text-white p-0.5 hover:text-white"
              onReset={() => {
                setHasSaved(false);
                Rest.setValue(juso.rest);
                Rest.focus();
              }}
            />

            <button
              type="button"
              className="size-10 rounded bg-primary items-center text-white justify-center"
            >
              <IoSearch />
            </button>
          </div>
        ) : (
          <>
            <div className="flex gap-2 items-end">
              <Rest.Component
                {...Keyword.props}
                value={juso?.roadAddr}
                onReset={onResetAndSearch}
                readOnly
                className="text-sm text-zinc-500"
                containerClassName="flex-1"
                label={{ children: "선택한 주소" }}
              />
              <Rest.Component
                {...Keyword.props}
                value={juso?.zipNo}
                onReset={onResetAndSearch}
                readOnly
                className="text-xs text-zinc-500"
                containerClassName="w-20"
                label={{ children: "우편번호" }}
              />
            </div>
            <div className="flex gap-2 items-end">
              <Rest.Component
                label={{ children: "상세주소" }}
                {...Rest.props}
                placeholder="상세 주소를 입력해주세요"
                containerClassName="flex-1"
                messageShown={false}
              />
              <button className="rounded border bg-primary text-white px-2 h-10 items-center text-sm">
                저장
              </button>
              <button
                type="button"
                className="h-10  px-2 rounded bg-zinc-100 items-center text-zinc-500 justify-center text-xs"
                onClick={onResetAndSearch}
              >
                재검색
              </button>
            </div>
          </>
        )
      ) : (
        <>
          <div className="flex items-end">
            <Keyword.Component
              {...Keyword.props}
              containerClassName="flex-1"
              label={{ children: "검색어" }}
              messageShown={false}
              className="rounded-r-none focus:border-r-none"
              placeholder="둔산3로 79"
              onReset={() => setHasSearched(false)}
            />
            <button
              className={twMerge(
                "size-10 rounded-r bg-primary text-white justify-center items-center text-lg disabled:cursor-progress disabled:bg-primary/50 disabled:backdrop-blur-md",
                Keyword.focused && "border border-primary border-l-0",
              )}
              disabled={isPending}
            >
              {isPending ? <CgSpinner /> : <IoSearch />}
            </button>
          </div>
          {!hasSearched ? (
            <button
              type="button"
              onClick={Keyword.focus}
              className="py-10 border border-border rounded justify-center text-zinc-500 text-xs"
            >
              검색어를 입력해주세요.
            </button>
          ) : (
            <div className="flex flex-col">
              <ul
                className="flex-1 overflow-y-auto max-h-[calc(30dvh)]"
                ref={ref}
              >
                {data?.map((items, index) => (
                  <Fragment key={index}>
                    {items.map((j, i) => (
                      <li key={j.bdMgtSn}>
                        <button
                          type="button"
                          className={twMerge(
                            "w-full p-1 text-sm hover:bg-primary/5 hover:text-primary items-center gap-1 rounded",
                            i % 2 === 1 && "bg-primary/2",
                          )}
                          onClick={() => {
                            setJuso(filterJuso(j));
                            Rest.focus();
                          }}
                        >
                          <span className="text-xs rounded bg-primary text-white px-1">
                            {j.zipNo}
                          </span>
                          <p className="text-left truncate flex-1">
                            {j.roadAddr}
                          </p>
                        </button>
                      </li>
                    ))}
                  </Fragment>
                ))}
              </ul>
              {hasNextPage && (
                <button
                  type="button"
                  className="items-center gap-2 w-full justify-center text-primary text-xs py-3"
                  onClick={onFetchMore}
                >
                  더 보기 <IoChevronDown />
                </button>
              )}
            </div>
          )}
        </>
      )}
    </Form>
  );
};

const useJusoForm = () => {
  const Keyword = useTextInput({
    validator: (v) => lengthValidator(v, "검색어를 입력해주세요."),
  });
  const Rest = useTextInput({
    validator: (v) => lengthValidator(v, "상세 주소를 입력해주세요."),
  });
  const [juso, setJuso] = useState<null | Juso>(null);

  const props = useMemo<Props>(
    () => ({ juso, Keyword, Rest, setJuso }),
    [juso, Keyword, Rest],
  );

  return {
    Component,
    props,
  };
};

export default useJusoForm;
