import "server-only";
import type { Locale } from "@/i18n";

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
	en: () => import("@/content/en.json").then((module) => module.default),
	ru: () => import("@/content/ru.json").then((module) => module.default),
	es: () => import("@/content/es.json").then((module) => module.default),
};

export const getContent= async (locale: Locale) =>
	dictionaries[locale]?.() ?? dictionaries.en();
