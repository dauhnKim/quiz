import { atom } from "jotai";
import { QuizType, UserAnswerInfoType } from "./metrics";

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

export const themeAtom = atom(prefersDark ? "dark" : "light");
export const isTimeRunningAtom = atom<boolean>(false);

export const quizzesAtom = atom<Array<QuizType>>([]);
export const userAnswersAtom = atom<UserAnswerInfoType>({ totalTime: "", answerInfo: [] });

export const totalTimeAtom = atom<string>("");
