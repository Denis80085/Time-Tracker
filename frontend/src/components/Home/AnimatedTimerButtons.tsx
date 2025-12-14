import { SwitchPad } from "../SwitchPad.tsx";
import MenuButton from "./MenuButton.tsx";
import { SwitchPadContext } from "../SwitchPad.tsx";
import { useContext } from "react";
import { TimerContext } from "../../hooks/TimerContext.tsx";

type AnimatedTimerButtonsProps = {
  onStartHover?: () => void;
  onStopHover?: () => void;
  onPauseHover?: () => void;
  onDiverseHover?: () => void;
  onUnhover?: () => void;
};

export default function AnimatedTimerButtons({
  onStartHover,
  onStopHover,
  onPauseHover,
  onDiverseHover,
  onUnhover,
}: AnimatedTimerButtonsProps) {
  const { Swap } = useContext(SwitchPadContext);
  const { startTimer, pauseTimer, stopTimer, setBorderColor } =
    useContext(TimerContext);

  return (
    <SwitchPad
      switchDuration={0.5}
      left={
        <div className="flex justify-center items-center px-1 space-x-2">
          <MenuButton
            Type="Start"
            OnMouseLeave={() => {
              setBorderColor("border-amber-100");
              onUnhover && onUnhover();
            }}
            OnHover={() => {
              setBorderColor("border-green-500");
              onStartHover && onStartHover();
            }}
            OnClick={() => {
              Swap();
              startTimer();
            }}
          />
          <MenuButton
            Type={"Diverse"}
            OnHover={() => {
              setBorderColor("border-violet-500");
              onDiverseHover && onDiverseHover();
            }}
            OnMouseLeave={() => {
              setBorderColor("border-amber-100");
              onUnhover && onUnhover();
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
              setBorderColor("border-amber-100");
              onUnhover && onUnhover();
            }}
            OnHover={() => {
              setBorderColor("border-yellow-300");
              onPauseHover && onPauseHover();
            }}
            OnClick={() => {
              pauseTimer();
            }}
          />
          <MenuButton
            Type="Stop"
            OnMouseLeave={() => {
              setBorderColor("border-amber-100");
              onUnhover && onUnhover();
            }}
            OnHover={() => {
              setBorderColor("border-red-600");
              onStopHover && onStopHover();
            }}
            OnClick={() => {
              Swap();
              stopTimer();
            }}
          />
        </div>
      }
    />
  );
}
