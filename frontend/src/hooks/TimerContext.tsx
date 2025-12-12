import { createContext, type ReactNode, useState } from "react"

type TimerContextProps = {
    started:Number;
    paused:Number;
    stoped:Number;
    border: string;
    startTimer: () => void;
    pauseTimer: () => void;
    stopTimer: () => void;
}

export const TimerContext = createContext<TimerContextProps>({ started:0, paused:0, stoped:0, border:"border-amber-100", 
    startTimer: () => {}, stopTimer: () => {}, pauseTimer: () => {} });

export const TimerContextProvider = ({children}:{children?:ReactNode}) => {
    const [start, setStart] = useState(0);
    const [pause, setPause] = useState(0);
    const [stop, setStop] = useState(0);

    return (
        <TimerContext.Provider value={{
            started:start, 
            paused:pause, 
            stoped:stop, 
            startTimer: () => {
                if(start == 0)
                    {
setStart(1);
                    }
                
            },
            pauseTimer: () => {
                setStart(0);
                setStop(0);
                setPause(0);
            },
            stopTimer: () => {
                setStart(0);
                setStop(0);
                setPause(0);
            },
            border:"border-amber-100"
            }}>
            {children}
        </TimerContext.Provider>
    );
}