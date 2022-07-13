import { useEffect, useState } from "react";

import { useAtomValue, useSetAtom } from "jotai";
import { isTimeRunningAtom, userAnswersAtom } from "../utils/store";

const StopWatch = () => {
  const [time, setTime] = useState(0);
  const isRunning = useAtomValue(isTimeRunningAtom);
  const setUserAnswers = useSetAtom(userAnswersAtom);

  useEffect(() => {
    let interval: string | number | NodeJS.Timer | undefined;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!isRunning) {
      clearInterval(interval);

      const totalTime = `${("0" + Math.floor((time / 60000) % 60)).slice(-2)}:${("0" + Math.floor((time / 1000) % 60)).slice(-2)}`;
      setUserAnswers((prev) => ({ ...prev, totalTime }));

      setTime(0);
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  return isRunning ? (
    <div>
      <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
      <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
    </div>
  ) : null;
};

export default StopWatch;
