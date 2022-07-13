import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useAtomValue } from "jotai";

import { ChartType } from "../utils/metrics";
import { quizzesAtom, userAnswersAtom } from "../utils/store";

import PieChart from "../components/PieChart";
import { PrimaryButton } from "../components/Button/Primary";

const QuizResult = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Array<ChartType>>([]);

  const quizzes = useAtomValue(quizzesAtom);
  const userAnswers = useAtomValue(userAnswersAtom);

  // console.log("userAnswers :>> ", userAnswers);
  // console.log("quizzes :>> ", quizzes);

  useEffect(() => {
    let tempChartData = [
      { name: "Correct", value: 0 },
      { name: "Incorrect", value: 0 },
    ];

    userAnswers.answerInfo.map((answer, i) => {
      answer.isCorrect ? tempChartData[0].value++ : tempChartData[1].value++;
    });

    setData(tempChartData);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <section className="w-full flex flex-col items-center space-y-4">
        <h1 className="text-3xl font-bold">Result</h1>
        <h1 className="text-sm">
          <span className="mr-2 font-extralight ">Total Time </span>
          {userAnswers.totalTime}
        </h1>
      </section>
      {data.length > 0 && <PieChart data={data} total={userAnswers.answerInfo.length} />}
      <section className="w-full grid grid-cols-2 mb-20">
        {data.map((d) => (
          <div key={d.name} className="flex flex-col items-center justify-center space-y-4">
            <div className="font-light">{d.name}</div>
            <div className="font-bold text-2xl">{d.value}</div>
          </div>
        ))}
      </section>

      <PrimaryButton text={"Try Again"} onClick={() => navigate("/")} />
    </div>
  );
};

export default QuizResult;
