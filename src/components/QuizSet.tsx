import { useAtomValue } from "jotai";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

import { cls } from "../utils/libs";
import { QuizType } from "../utils/metrics";
import { themeAtom } from "../utils/store";

interface Props {
  currentQuiz: number;
  val?: string;
  quizzes: Array<QuizType>;
  answers: Array<string>;
  onChange?: () => void;
  userAnswer?: string;
  className?: string;
}

const QuizSet: React.FC<any> = ({ currentQuiz, val, onChange, quizzes, answers, userAnswer, className = "" }: Props) => {
  const theme = useAtomValue<string>(themeAtom);
  const isCorrect = val === quizzes[currentQuiz]?.correct_answer || false;

  const radioStyle = {
    color: theme === "dark" ? "rgb(229 231 235)" : "black",
    "&.Mui-checked": {
      color: theme === "dark" && isCorrect ? "#00c896" : isCorrect ? "#00a37a" : "#E85B2A",
    },
  };

  return (
    <>
      {/* Question */}
      <div className="text-2xl">
        <h1 className="inline mr-3">Q {currentQuiz + 1}.</h1>
        <div className="inline" dangerouslySetInnerHTML={{ __html: quizzes[currentQuiz].question }}></div>
      </div>

      {/* Answers */}
      <RadioGroup className={cls(className, "py-10")} name="quiz" value={val ? val : ""} onChange={onChange ? onChange : () => {}}>
        {answers.map((v, i) => {
          return (
            <FormControlLabel
              //
              key={v}
              value={v}
              label={v}
              control={<Radio checked={userAnswer ? v === userAnswer : undefined} sx={radioStyle} />}
            />
          );
        })}
      </RadioGroup>
    </>
  );
};

export default QuizSet;
