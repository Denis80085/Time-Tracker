import { useState } from "react";
import AnimatedParagraph from "./AnimatedParagraph";
import Timer from "./Timer";
//import { startSession, finishSession } from "../../services/WorkSesionService";
import { SwitchProvider } from "../SwitchPad.tsx";
import { TimerContextProvider } from "../../hooks/TimerContext.tsx";
import AnimatedTimerButtons from "./AnimatedTimerButtons.tsx";

type UserMenuProps = {
  className?: string;
};

function UserMenu({ className }: UserMenuProps) {
  const defaultPhrase = "Actions";
  const [Phrase, setPhrase] = useState(defaultPhrase);
  const [PhraseColor, setPhraseColor] = useState("text-white");
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
        <TimerContextProvider>
          <Timer />
          <div className="mt-1">
            <SwitchProvider>
              <AnimatedTimerButtons />
            </SwitchProvider>
          </div>
        </TimerContextProvider>
      </div>
    </div>
  );
}

export default UserMenu;
