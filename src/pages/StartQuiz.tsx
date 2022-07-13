import { Link } from "react-router-dom";

import { useSetAtom } from "jotai";
import { isTimeRunningAtom, quizzesAtom } from "../utils/store";

import { PrimaryButton } from "../components/Button/Primary";

const StartQuiz = () => {
  const setIsTimeRunning = useSetAtom(isTimeRunningAtom);
  const setQuizzes = useSetAtom(quizzesAtom);

  const onStartClick = () => {
    setIsTimeRunning(true);
    setQuizzes([]);
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="text-6xl">Quiz</h1>
      <p className="py-10 text-[#737373] text-center">You will be presented with 10 questions. Follow the instructions on each page. Your results will be calculated at the end.</p>
      <Link to="/main-quiz">
        <PrimaryButton text="Start" onClick={onStartClick} type="button" />
      </Link>
    </div>
  );
};

export default StartQuiz;
