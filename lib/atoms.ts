import { atomWithStorage } from "jotai/utils";

export const persistentToken = atomWithStorage("token", {
  count: 0,
  date: Date.now(),
});
