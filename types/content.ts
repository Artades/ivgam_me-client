import { getContent } from "@/utils/getContent";

export type TContent<K extends keyof Awaited<ReturnType<typeof getContent>>> = {
  content: Awaited<ReturnType<typeof getContent>>[K];
};
