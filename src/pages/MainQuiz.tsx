import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { TailSpin } from "react-loader-spinner";

import axios from "axios";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import { cls } from "../utils/libs";
import { AnswerType } from "../utils/metrics";
import { answersAtom, isTimeRunningAtom, quizzesAtom, themeAtom, userAnswersAtom } from "../utils/store";

import QuizSet from "../components/QuizSet";
import { PrimaryButton } from "../components/Primary";

const MainQuiz = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentQuiz, setCurrentQuiz] = useState<number>(0);

  const [value, setValue] = useState<string>("");
  const [helperText, setHelperText] = useState<string>("");

  const theme = useAtomValue<string>(themeAtom);
  const setIsRunning = useSetAtom(isTimeRunningAtom);
  const [quizzes, setQuizzes] = useAtom(quizzesAtom);
  const [answers, setAnswers] = useAtom(answersAtom);
  const [userAnswers, setUserAnswers] = useAtom(userAnswersAtom);

  let amount = 10;
  const isCorrect = value === quizzes[currentQuiz]?.correct_answer || false;
  useEffect(() => {
    getQuiz();
  }, []);

  useEffect(() => {
    if (value === "") {
      setHelperText("");
      return;
    }

    if (isCorrect) {
      setHelperText("You got it!");
    } else {
      setHelperText("Sorry, wrong answer!");
    }
  }, [isCorrect, value]);

  const getQuiz = async () => {
    try {
      setIsLoading(true);

      if (quizzes.length > 0) return;

      const { data } = await axios.get(`https://opentdb.com/api.php?amount=${amount}&category=27&type=multiple`);

      // Shuffle answers
      let tempAnswers: Array<AnswerType> = [];
      for (let i = 0; i < data.results.length; i++) {
        const res = data.results[i];
        const answers = [res.correct_answer, ...res.incorrect_answers];
        const randomAnswers = answers.sort(() => Math.random() - 0.5);
        tempAnswers.push({ answer: randomAnswers });

        const { correct_answer, incorrect_answers, question } = data.results[i];
        setQuizzes((prev) => {
          const arr = [...prev, { correct_answer, incorrect_answers, question }];
          return arr;
        });
      }

      setAnswers(tempAnswers);

      // Create an answer array for answers from user
      const answerArray = Array.from({ length: data.results.length }, () => {
        return { isCorrect: null, userAnswer: "", answers: [] };
      });
      setUserAnswers({ totalTime: "", answerInfo: answerArray });
    } catch (error) {
      console.log("error : ", error);
    } finally {
      setIsLoading(false);
      setIsRunning(true);
    }
  };

  const onRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const onNextClick = () => {
    setCurrentQuiz(currentQuiz + 1);
    setValue("");
    setHelperText("");

    let isCorrect: boolean | null = null;

    if (quizzes[currentQuiz].correct_answer === value) isCorrect = true;
    else isCorrect = false;

    const editedAnswer = { isCorrect, userAnswer: value, answers: answers[currentQuiz].answer };

    const arr = userAnswers.answerInfo.map((u, i) => (i === currentQuiz ? editedAnswer : u));
    setUserAnswers({ totalTime: "", answerInfo: arr });

    if (currentQuiz + 1 === quizzes.length) {
      setIsRunning(false);
      navigate("/quiz-result");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {isLoading ? (
        <TailSpin height={25} width={25} color={theme === "dark" ? "#f0f0f0" : "#000"} />
      ) : (
        <form>
          <QuizSet val={value} onChange={onRadioChange} currentQuiz={currentQuiz} quizzes={quizzes} answers={answers[currentQuiz].answer} />

          <div className="w-full flex justify-between items-center">
            <div className={cls(theme === "dark" && isCorrect ? "text-[#00c896]" : isCorrect ? "text-[#00a37a]" : "text-[#E85B2A]", "text-xl")}>{helperText}</div>
            <PrimaryButton text={currentQuiz + 1 === quizzes.length ? "Finish" : "Next"} onClick={onNextClick} className={cls(value !== "" ? "opacity-100" : "opacity-0 pointer-events-none")} />
          </div>
        </form>
      )}
    </div>
  );
};

export default MainQuiz;
