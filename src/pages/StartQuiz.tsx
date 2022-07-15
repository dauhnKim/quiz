import { Link } from "react-router-dom";

import { useSetAtom } from "jotai";
import { answersAtom, quizzesAtom } from "../utils/store";

import { PrimaryButton } from "../components/Primary";

const StartQuiz = () => {
  const setQuizzes = useSetAtom(quizzesAtom);
  const setAnswers = useSetAtom(answersAtom);

  const onStartClick = () => {
    setQuizzes([]);
    setAnswers([]);
  };

  return (
    <div className="flex items-center justify-center flex-col h-screen">
      <h1 className="text-6xl">Quiz</h1>
      <p className="py-10 text-[#737373] text-center">You will be presented with 10 questions. Follow the instructions on each page. Your results will be calculated at the end.</p>
      <Link to="/main-quiz">
        <PrimaryButton text="Start" onClick={onStartClick} type="button" />
      </Link>
    </div>
  );
};

export default StartQuiz;
