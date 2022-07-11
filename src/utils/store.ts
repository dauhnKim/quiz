import { atom } from "jotai";

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

export const isDarkAtom = atom(prefersDark ? "dark" : "light");
export const isTimeRunningAtom = atom(false);
