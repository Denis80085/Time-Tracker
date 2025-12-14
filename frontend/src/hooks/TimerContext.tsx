import { createContext, type ReactNode, useState } from "react";

type TimerContextProps = {
  started: Number;
  border: string;
  startTimer: () => void;
  pauseTimer: () => void;
  stopTimer: () => void;
};

export const TimerContext = createContext<TimerContextProps>({
  started: 0,
  border: "border-amber-100",
  startTimer: () => {},
  stopTimer: () => {},
  pauseTimer: () => {},
});

export const TimerContextProvider = ({
  children,
}: {
  children?: ReactNode;
}) => {
  const [start, setStart] = useState(0);

  return (
    <TimerContext.Provider
      value={{
        started: start,
        startTimer: () => {
          setStart(1);
        },
        pauseTimer: () => {
          setStart(2);
        },
        stopTimer: () => {
          setStart(0);
        },
        border: "border-amber-100",
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
