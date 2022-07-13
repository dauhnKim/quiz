import { useAtom, useAtomValue } from "jotai";
import { quizzesAtom, userAnswersAtom } from "../utils/store";

const QuizResult = () => {
  const [userAnswers, setUserAnswers] = useAtom(userAnswersAtom);
  const quizzes = useAtomValue(quizzesAtom);

  console.log("userAnswers :>> ", userAnswers);
  console.log("quizzes :>> ", quizzes);

  return <div>QuizResult</div>;
};

export default QuizResult;
