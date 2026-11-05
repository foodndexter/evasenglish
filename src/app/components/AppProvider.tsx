"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, Suspense, useEffect, useState } from "react";
import { useLessonStore } from "../zustand/useLessonStore";
import { useSchoolStore } from "../zustand/useSchoolStore";

const AppProvider = ({ children }: PropsWithChildren) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        setInitialized(false);
        console.log("initializing app...");
        await useLessonStore.getState().init();
        await useSchoolStore.getState().init();
      } finally {
        setInitialized(true);
        console.log("initialized!");
      }
    };
    init();
    return () => {
      init();
    };
  }, []);
  return (
    <Suspense fallback={<>Loading...</>}>
      <QueryClientProvider client={new QueryClient()}>
        {children}
      </QueryClientProvider>
    </Suspense>
  );
};

export default AppProvider;
