"use client";

import { getContent } from "@/utils/getContent";

type TContentKey = Omit<keyof Awaited<ReturnType<typeof getContent>>, "intro">;

export const scrollToSection = (section: TContentKey): void => {

  if (typeof document !== "undefined") {
    const element = document.getElementById(section.toLowerCase());
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }
};
