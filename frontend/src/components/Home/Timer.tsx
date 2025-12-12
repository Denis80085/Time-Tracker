import TimerBlock from "./TimerBlock";
import { useEffect, useState, useRef, useContext } from "react";
import { TimerContext } from "../../hooks/TimerContext";

function Timer() {
  const [Seconds, setSeconds] = useState(0);
  const [Minutes, setMinutes] = useState(0);
  const [Hours, setHours] = useState(0);
  const counterRef = useRef<number | null>(null);

  const {started, paused, stoped, border} = useContext(TimerContext)

  function OnSixtySeconds() {
    setSeconds(0);
    setMinutes((prev) => prev + 1);
  }

  function OnSixtyMinutes() {
    setMinutes(0);
    setHours((prev) => prev + 1);
  }

  useEffect(() => {
    if (!counterRef.current && started) {
      counterRef.current = window.setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
  }, [started]);

  useEffect(() => {
    if (Seconds > 59) {
      OnSixtySeconds();
    }

    if (counterRef.current != null && started) {
      clearInterval(counterRef.current);
      counterRef.current = window.setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
  }, [Seconds]);

  useEffect(() => {
    if (Minutes > 59) {
      OnSixtyMinutes();
    }
  }, [Minutes]);

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
    setMinutes(0);
    setHours(0);
  }, [stoped]);

  useEffect(() => {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  }, []);

  return (
    <div
      className={
        "flex justify-center items-center space-x-2 w-full p-2 " +
        `rounded-2xl border-2 ${border}` +
        " text-white text-3xl text-center transition-all duration-200"
      }
    >
      <TimerBlock value={Hours} valueType={"h"} />
      <span>:</span>
      <TimerBlock value={Minutes} valueType={"m"} />
      <span>:</span>
      <TimerBlock value={Seconds} valueType={"s"} />
    </div>
  );
}

export default Timer;
