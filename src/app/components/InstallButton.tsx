"use client";

import { ComponentProps, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
  }>;
};

export default function InstallButton(props: ComponentProps<"button">) {
  const [promptEvent, setPromptEvent] = useState<InstallPromptEvent | null>(
    null,
  );

  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault();
      setPromptEvent(event as InstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  async function install() {
    if (!promptEvent) return;

    await promptEvent.prompt();
    await promptEvent.userChoice;

    setPromptEvent(null);
  }

  if (!promptEvent) return null;

  return (
    <button
      {...props}
      onClick={install}
      className={twMerge("install", props?.className)}
    >
      Install App
    </button>
  );
}
