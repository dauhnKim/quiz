import { useEffect, useState } from "react";

import axios from "axios";
import { useAtomValue } from "jotai";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

import { cls } from "../utils/libs";
import { isDarkAtom } from "../utils/store";

import { PrimaryButton } from "../components/Button/Primary";
interface QuizType {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: Array<string>;
  question: string;
  type: string;
}
interface AnswerType {
  answer: Array<string>;
}

const MainQuiz = () => {
  const [currentQuiz, setCurrentQuiz] = useState<number>(0);

  const [quizzes, setQuizzes] = useState<Array<QuizType>>([]);
  const [answers, setAnswers] = useState<Array<AnswerType>>([]);

  const [value, setValue] = useState<string>("");
  const [helperText, setHelperText] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const theme = useAtomValue(isDarkAtom);
  const isCorrect = value === quizzes[currentQuiz]?.correct_answer || false;

  useEffect(() => {
    const entries = performance.getEntriesByType("navigation");
    const type = entries.map((nav: any) => nav.type);

    getQuiz();

    return () => {
      if (type[0] === "reload") {
        window.location.href = "/";
      }
    };
  }, []);

  const getQuiz = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("https://opentdb.com/api.php?amount=10&category=27&type=multiple");
      setQuizzes(data.results);

      // Shuffle answers
      let tempAnswers: Array<AnswerType> = [];
      for (let i = 0; i < data.results.length; i++) {
        const res = data.results[i];
        const answers = [res.correct_answer, ...res.incorrect_answers];
        const randomAnswers = answers.sort(() => Math.random() - 0.5);
        tempAnswers.push({ answer: randomAnswers });
      }
      setAnswers(tempAnswers);
    } catch (error) {
      console.log("error : ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

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

  const onNextClick = () => {
    setCurrentQuiz(currentQuiz + 1);
    setValue("");
    setHelperText("");
  };

  const radioStyle = {
    color: theme === "dark" ? "rgb(229 231 235)" : "black",
    "&.Mui-checked": {
      color: theme === "dark" && isCorrect ? "#00c896" : isCorrect ? "#00a37a" : "#E85B2A",
    },
  };

  console.log("value :>> ", value);
  return (
    <div className="px-10">
      {!isLoading && (
        <form>
          {/* Question */}
          <div className="text-2xl">
            <h1 className="inline mr-3">Q{currentQuiz + 1}.</h1>
            <div className="inline" dangerouslySetInnerHTML={{ __html: quizzes[currentQuiz].question }}></div>
          </div>

          {/* Answers */}
          <RadioGroup className="py-10" name="quiz" value={value} onChange={onRadioChange}>
            {answers[currentQuiz].answer.map((value, i) => {
              return <FormControlLabel key={i} value={value} control={<Radio sx={radioStyle} />} label={value} />;
            })}
          </RadioGroup>

          <div className="w-full flex justify-between items-center">
            <div className={cls(theme === "dark" && isCorrect ? "text-[#00c896]" : isCorrect ? "text-[#00a37a]" : "text-[#E85B2A]", "text-xl")}>{helperText}</div>
            <PrimaryButton text="Next" onClick={onNextClick} className={cls(value !== "" ? "opacity-100" : "opacity-0 pointer-events-none")} />
          </div>
        </form>
      )}
    </div>
  );
};

export default MainQuiz;
