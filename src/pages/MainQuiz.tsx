import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

import axios from "axios";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

import useDidMountEffect from "../hooks/useDidMountEffect";

import { cls } from "../utils/libs";
import { AnswerType } from "../utils/metrics";
import { isTimeRunningAtom, quizzesAtom, themeAtom, userAnswersAtom } from "../utils/store";

import { PrimaryButton } from "../components/Button/Primary";

const MainQuiz = () => {
  const navigate = useNavigate();
  const [currentQuiz, setCurrentQuiz] = useState<number>(0);

  const [answers, setAnswers] = useState<Array<AnswerType>>([]);

  const [value, setValue] = useState<string>("");
  const [helperText, setHelperText] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const theme = useAtomValue<string>(themeAtom);
  const setIsRunning = useSetAtom(isTimeRunningAtom);
  const [quizzes, setQuizzes] = useAtom(quizzesAtom);
  const [userAnswers, setUserAnswers] = useAtom(userAnswersAtom);

  const isCorrect = value === quizzes[currentQuiz]?.correct_answer || false;

  useEffect(() => {
    // When the page is refreshed, redirect to '/'
    const entries = performance.getEntriesByType("navigation");
    const type = entries.map((nav: any) => nav.type);

    return () => {
      if (type[0] === "reload") {
        window.location.href = "/";
      }
    };
  }, []);

  useDidMountEffect(() => {
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
    console.count();
    try {
      setIsLoading(true);
      const { data } = await axios.get("https://opentdb.com/api.php?amount=3&category=27&type=multiple");

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

  const radioStyle = {
    color: theme === "dark" ? "rgb(229 231 235)" : "black",
    "&.Mui-checked": {
      color: theme === "dark" && isCorrect ? "#00c896" : isCorrect ? "#00a37a" : "#E85B2A",
    },
  };

  return (
    <div className="px-10">
      {!isLoading && (
        <form>
          {/* Question */}
          <div className="text-2xl">
            <h1 className="inline mr-3">Q {currentQuiz + 1}.</h1>
            <div className="inline" dangerouslySetInnerHTML={{ __html: quizzes[currentQuiz].question }}></div>
          </div>

          {/* Answers */}
          <RadioGroup className="py-10" name="quiz" value={value} onChange={onRadioChange}>
            {answers[currentQuiz].answer.map((value) => {
              return <FormControlLabel key={value} value={value} control={<Radio sx={radioStyle} />} label={value} />;
            })}
          </RadioGroup>

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
