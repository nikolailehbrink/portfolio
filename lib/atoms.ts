import { atomWithStorage } from "jotai/utils";

export const chatToken = atomWithStorage("token", {
  count: 0,
  date: Date.now(),
});
