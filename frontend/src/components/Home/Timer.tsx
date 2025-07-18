import TimerBlock from "./TimerBlock";
import { useEffect, useState, useRef } from "react";

type TimerProps = {
  started: boolean;
  stoped: boolean;
  paused: boolean;
};

function Timer({ started, paused, stoped }: TimerProps) {
  const [Seconds, setSeconds] = useState(0);
  const counterRef = useRef<number | null>(null);

  useEffect(() => {
    if (!counterRef.current && started) {
      counterRef.current = window.setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
  }, [started]);

  useEffect(() => {
    if (counterRef.current != null && started) {
      clearInterval(counterRef.current);
      counterRef.current = window.setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
  }, [Seconds]);

  useEffect(() => {
    if (counterRef.current != null && paused) {
      clearInterval(counterRef.current);
      counterRef.current = null;
    }
  }, [paused]);

  useEffect(() => {
    if (counterRef.current != null && stoped) {
      clearInterval(counterRef.current);
      counterRef.current = null;
    }

    setSeconds(0);
  }, [stoped]);

  return (
    <div
      className={
        "flex justify-center items-center space-x-2 w-fit mx-auto p-2 border-2 border-amber-100 rounded-2xl " +
        "text-white text-3xl text-center"
      }
    >
      <TimerBlock value={0} valueType={"h"} />
      <span>:</span>
      <TimerBlock value={0} valueType={"m"} />
      <span>:</span>
      <TimerBlock value={Seconds} valueType={"s"} />
    </div>
  );
}

export default Timer;
