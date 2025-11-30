import { SwitchPad } from "../SwitchPad.tsx";
import MenuButton from "./MenuButton.tsx";
import { SwitchPadContext } from "../SwitchPad.tsx";
import { useContext } from "react";

export default function AnimatedTimerButtons() {
  const { moveTo } = useContext(SwitchPadContext);

  return (
    <SwitchPad
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
              moveTo(1);
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
              moveTo(0);
            }}
          />
        </div>
      }
    />
  );
}
