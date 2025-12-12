import { SwitchPad } from "../SwitchPad.tsx";
import MenuButton from "./MenuButton.tsx";
import { SwitchPadContext } from "../SwitchPad.tsx";
import { useContext } from "react";
import { TimerContext } from "../../hooks/TimerContext.tsx";

export default function AnimatedTimerButtons() {
  const { Swap } = useContext(SwitchPadContext);
  const {startTimer, pauseTimer, stopTimer} = useContext(TimerContext);

  console.log("redering AnimatedTimerButtons");
  return (
    <SwitchPad
      switchDuration={0.2}
      left={
        <div className="flex justify-center items-center px-1 space-x-2">
          <MenuButton
            Type="Start"
            OnMouseLeave={() => {
              // HandelMouseLeave();
            }}
            OnHover={() => {
              // HandelHover("Starten", "green-500");
            }}
            OnClick={() => {
              // setStartTimer(true);
              // setPauseTimer(false);
              // setStopTimer(false);
              Swap();
              startTimer();
            }}
          />
          <MenuButton
            Type={"Diverse"}
            OnHover={() => {}} //HandelHover("Sonstiges", "violet-500")}
            OnMouseLeave={() => {
              //HandelMouseLeave();
            }}
            OnClick={() => {}}
          />
        </div>
      }
      right={
        <div className="flex justify-center items-center px-1 space-x-2">
          <MenuButton
            Type="Pause"
            OnMouseLeave={() => {
              //HandelMouseLeave();
            }}
            OnHover={() => {
              //HandelHover("Pause", "yellow-300");
            }}
            OnClick={() => {
              // setStartTimer(false);
              // setPauseTimer(true);
              // setStopTimer(false);
              pauseTimer();
            }}
          />
          <MenuButton
            Type="Stop"
            OnMouseLeave={() => {
              //HandelMouseLeave();
            }}
            OnHover={() => {
              // HandelHover("Beenden", "red-600");
            }}
            OnClick={() => {
              // setStopTimer(true);
              // setPauseTimer(false);
              // setStartTimer(false);
              Swap();
              stopTimer();
            }}
          />
        </div>
      }
    />
  );
}
