import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useAtom } from "jotai";

import { ChartType } from "../utils/metrics";
import { quizzesAtom, userAnswersAtom } from "../utils/store";

import QuizSet from "../components/QuizSet";
import PieChart from "../components/PieChart";
import AccordionSet from "../components/AccordionSet";
import { PrimaryButton } from "../components/Primary";
import { useLocalStorage } from "../hooks/useLocalStorage";

const QuizResult = () => {
  const navigate = useNavigate();

  const [chartData, setChartData] = useState<Array<ChartType>>([]);

  const [quizzes, setQuizzes] = useAtom(quizzesAtom);
  const [userAnswers, setUserAnswers] = useAtom(userAnswersAtom);

  const [localQuizzes, setLocalQuizzes] = useLocalStorage<string>("quizzes", "");
  const [localUserAnswers, setLocalUserAnswers] = useLocalStorage<string>("userAnswers", "");

  useEffect(() => {
    if (quizzes.length > 0) {
      // 정상적으로 진입
      setLocalQuizzes(JSON.stringify(quizzes));
      setLocalUserAnswers(JSON.stringify(userAnswers));
    } else {
      // 새로고침 후, 진입
      setQuizzes(localQuizzes ? JSON.parse(localQuizzes) : []);
      setUserAnswers(localUserAnswers ? JSON.parse(localUserAnswers) : { totalTime: "", answerInfo: [] });
    }

    window.history.pushState(null, "", document.URL);
    window.addEventListener("popstate", () => navigate("/"));
    return () => {
      window.removeEventListener("popstate", () => {});
    };
  }, []);

  useEffect(() => {
    let tempChartData = [
      { name: "Correct", value: 0 },
      { name: "Incorrect", value: 0 },
    ];

    userAnswers.answerInfo.map((answer) => {
      return answer.isCorrect ? tempChartData[0].value++ : tempChartData[1].value++;
    });

    setChartData(tempChartData);
  }, [userAnswers]);

  return (
    <div className="w-full h-full">
      <section className="py-[15vh] flex items-center justify-center flex-col">
        <div className="w-full flex flex-col items-center space-y-4">
          <h1 className="text-3xl font-bold">Result</h1>
          <h1 className="text-sm">
            <span className="mr-2 font-extralight ">Total Time </span>
            {userAnswers.totalTime}
          </h1>
        </div>
        {chartData.length > 0 && <PieChart data={chartData} total={userAnswers.answerInfo.length} />}
        <div className="w-full grid grid-cols-2 mb-20">
          {chartData.map((d) => (
            <div key={d.name} className="flex flex-col items-center justify-center space-y-4">
              <div className="font-light">{d.name}</div>
              <div className="font-bold text-2xl">{d.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-x-8">
          <PrimaryButton text={"Try Again"} onClick={() => navigate("/main-quiz")} />
          <PrimaryButton text={"Try New One"} onClick={() => navigate("/")} />
        </div>
      </section>

      <section className="pb-20">
        <AccordionSet title="Check what you got wrong">
          <div className="grid grid-cols-1 gap-y-16">
            {quizzes.map((quiz, idx) => {
              const { userAnswer, answers } = userAnswers.answerInfo[idx];
              return (
                quiz.correct_answer !== userAnswer && (
                  <div key={quiz.correct_answer}>
                    <QuizSet currentQuiz={idx} quizzes={quizzes} answers={answers} userAnswer={userAnswer} className="!py-6" />
                    <div className="w-full text-right font-extralight ">
                      Correct Answer : <b className="text-color">{quiz.correct_answer}</b>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </AccordionSet>
      </section>
    </div>
  );
};

export default QuizResult;
