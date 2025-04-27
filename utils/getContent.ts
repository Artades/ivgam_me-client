import "server-only";
import type { Locale } from "@/i18n";

const dictionaries = {
	en: () => import("@/content/en.json").then((module) => module.default),
	ru: () => import("@/content/ru.json").then((module) => module.default),
	es: () => import("@/content/es.json").then((module) => module.default),
};

export const getContent= async (locale: Locale) =>
	dictionaries[locale]?.() ?? dictionaries.en();
