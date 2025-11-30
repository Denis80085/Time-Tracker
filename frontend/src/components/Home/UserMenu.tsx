import { useState, useContext } from "react";
import AnimatedParagraph from "./AnimatedParagraph";
import Timer from "./Timer";
//import { startSession, finishSession } from "../../services/WorkSesionService";
import { SwitchProvider } from "../SwitchPad.tsx";

import AnimatedTimerButtons from "./AnimatedTimerButtons.tsx";

type UserMenuProps = {
  className?: string;
};

function UserMenu({ className }: UserMenuProps) {
  const defaultPhrase = "Actions";
  const [Phrase, setPhrase] = useState(defaultPhrase);
  const [PhraseColor, setPhraseColor] = useState("text-white");
  const [StarTimer, setStartTimer] = useState(false);
  const [PauseTimer, setPauseTimer] = useState(false);
  const [StopTimer, setStopTimer] = useState(false);
  const [TimerBorderColor, SetTimerBorderColor] = useState("border-amber-100");

  function HandelHover(Phrase: string, Color: string) {
    setPhraseColor(`text-${Color}`);
    setPhrase(Phrase);
    SetTimerBorderColor(`border-${Color}`);
  }

  function HandelMouseLeave() {
    setPhrase(defaultPhrase);
    setPhraseColor("text-white");
    SetTimerBorderColor("border-amber-100");
  }

  console.log("redering UserMenu");
  return (
    <div
      className={
        "w-1/3 flex flex-wrap items-center justify-center " + className
      }
    >
      <AnimatedParagraph content={Phrase} speed={40} color={PhraseColor} />
      <div className="grid grid-rows-[1fr_1fr] grid-cols-[0.5fr] space-y-2">
        <Timer
          started={StarTimer}
          paused={PauseTimer}
          stoped={StopTimer}
          border={TimerBorderColor}
        />

        <div className="mt-1">
          <SwitchProvider>
            <AnimatedTimerButtons />
          </SwitchProvider>
        </div>
      </div>
    </div>
  );
}

export default UserMenu;
