import { useEffect, useState } from "react";

import { useAtom } from "jotai";
import { isTimeRunningAtom } from "../utils/store";

const StopWatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useAtom(isTimeRunningAtom);

  useEffect(() => {
    let interval: string | number | NodeJS.Timer | undefined;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!isRunning) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="stopwatch">
      <div>
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
        {/* <span>{("0" + ((time / 10) % 100)).slice(-2)}</span> */}
      </div>
      {/* <div>
        <button onClick={() => setIsRunning(true)}>Start</button>
        <button onClick={() => setIsRunning(false)}>Stop</button>
        <button onClick={() => setTime(0)}>Reset</button>
      </div> */}
    </div>
  );
};

export default StopWatch;
