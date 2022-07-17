import { atom } from "jotai";
import { QuizType, UserAnswerInfoType, AnswerType } from "./metrics";

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

export const themeAtom = atom<string>(prefersDark ? "dark" : "light");
export const isTimeRunningAtom = atom<boolean>(false);
export const quizAmountAtom = atom<number>(5);

export const quizzesAtom = atom<Array<QuizType>>([]);
export const answersAtom = atom<Array<AnswerType>>([]);
export const userAnswersAtom = atom<UserAnswerInfoType>({ totalTime: "", answerInfo: [] });

export const totalTimeAtom = atom<string>("");
