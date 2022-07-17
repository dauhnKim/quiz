import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import { cls } from "../utils/libs";
import { answersAtom, quizAmountAtom, quizzesAtom, themeAtom } from "../utils/store";

import NumberField from "../components/NumberField";
import { PrimaryButton } from "../components/Primary";

const StartQuiz = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const theme = useAtomValue(themeAtom);
  const [amount, setAmount] = useAtom(quizAmountAtom);
  const setQuizzes = useSetAtom(quizzesAtom);
  const setAnswers = useSetAtom(answersAtom);

  const onStartClick = () => {
    setQuizzes([]);
    setAnswers([]);
  };

  const onChange = (event: { target: { value: number | ((prev: number) => number) } }) => {
    setAmount(event.target.value);
  };

  const onKeyPress = (ev: { key: string; preventDefault: () => void }) => {
    if (ev.key === "Enter" && +amount !== 0) {
      ev.preventDefault();
      navigate("/main-quiz");
    }
  };

  return (
    <div className="flex items-center justify-center flex-col h-full">
      <h1 className="text-6xl">Quiz</h1>
      <p className="py-10 text-[#737373] text-center">
        You will be presented with <b className="text-color">{amount}</b> question{+amount !== 1 && +amount !== 0 ? "s" : ""}. Follow the instructions on each page. Your results will be calculated at
        the end.
      </p>

      <section className="overflow-hidden duration-200 transition-all mb-10">
        <h2 onClick={() => setShow(!show)} className={cls(show && "!text-primary", "hover:underline hover:underline-offset-2 cursor-pointer text-[#00c89685] hover:text-primary")}>
          You can change the number of quizzes here
        </h2>

        <div className={cls(show ? "h-[94px] py-4" : "h-0", "w-full duration-500 transition-all flex justify-center")}>
          <NumberField theme={theme} amount={amount} onChange={onChange} onKeyPress={onKeyPress} />
        </div>
      </section>

      {+amount !== 0 ? (
        <Link to={"/main-quiz"}>
          <PrimaryButton text="Start" onClick={onStartClick} type="button" />
        </Link>
      ) : (
        <Link to={"/"}>
          <Button variant="outlined" size="large" disabled sx={{ "&.Mui-disabled": { color: "#777", borderColor: "#777" } }}>
            Disabled
          </Button>
        </Link>
      )}
    </div>
  );
};

export default StartQuiz;
