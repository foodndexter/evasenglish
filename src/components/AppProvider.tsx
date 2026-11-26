"use client";

import { useAuthStore } from "@/zustand";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, Suspense, useEffect, useState } from "react";

const AppProvider = ({ children }: PropsWithChildren) => {
  const [initialized, setInitialized] = useState(false);

  const { user, handler, init } = useAuthStore();
  useEffect(() => {
    const fn = async () => {
      try {
        setInitialized(false);
        const res = await fetch("/api/auth");
        const data = await res.json();

        if (!res.ok) {
          return console.warn(data.message);
        }
        handler(data.user);
      } finally {
        init();
      }
    };
    fn();
    return () => {
      fn();
    };
  }, [handler, init]);

  // useEffect(() =>{
  //   const fn = async () =>{
  //     if ( !user )return
  //     if( user.biz.length === 0 ) return

  //     const res = await fetch(`/api/biz/${}`)
  //    }

  //   fn()
  //   return () =>{
  //     fn()
  //   }
  // }, [ user])

  return (
    <Suspense fallback={<>Loading...</>}>
      <QueryClientProvider client={new QueryClient()}>
        {children}
      </QueryClientProvider>
    </Suspense>
  );
};

export default AppProvider;
