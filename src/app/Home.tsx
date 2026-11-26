"use client";

import { useAuthStore } from "@/zustand";
import { Button, useSelect } from "../components";
import { IoBusinessOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

const Home = () => {
  const user = useAuthStore((u) => u.user);
  const B = useSelect();
  const router = useRouter();
  if (!user) return null;
  return (
    <main>
      <header>
        {B.value ? (
          B.value
        ) : (
          <>
            {user.biz.length > 0 ? (
              <B.Component
                {...B.props}
                data={user.biz.map(({ id, name }) => ({
                  title: name,
                  value: id,
                }))}
                label={{
                  children: (
                    <>
                      <IoBusinessOutline /> 사업장
                    </>
                  ),
                }}
              />
            ) : (
              <Button
                isTouchable
                className="border px-2 text-xs"
                onClick={() => router.push("/settings/biz/create")}
              >
                등록된 사업장이 없습니다. 사업장 추가하기
              </Button>
            )}
          </>
        )}
      </header>
    </main>
  );
};

export default Home;
