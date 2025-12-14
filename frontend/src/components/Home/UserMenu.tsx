import { useRef, useState } from "react";
import AnimatedParagraph from "./AnimatedParagraph";
import Timer from "./Timer";
import { SwitchProvider } from "../SwitchPad.tsx";
import { TimerContextProvider } from "../../hooks/TimerContext.tsx";
import AnimatedTimerButtons from "./AnimatedTimerButtons.tsx";

type UserMenuProps = {
  className?: string;
};

function UserMenu({ className }: UserMenuProps) {
  const defaultPhrase = "Actions";
  const [Phrase, setPhrase] = useState(defaultPhrase);
  const PhraseColor = useRef("text-white");

  return (
    <div
      className={
        "w-1/3 flex flex-wrap items-center justify-center " + className
      }
    >
      <TimerContextProvider>
        <AnimatedParagraph
          content={Phrase}
          speed={45}
          color={PhraseColor.current}
        />
        <div className="grid grid-rows-[1fr_1fr] grid-cols-[0.5fr] space-y-2">
          <Timer />
          <div className="mt-1">
            <SwitchProvider>
              <AnimatedTimerButtons
                onStartHover={() => {
                  setPhrase("Starten");
                  PhraseColor.current = "text-green-500";
                }}
                onDiverseHover={() => {
                  setPhrase("Sonst.");
                  PhraseColor.current = "text-violet-500";
                }}
                onStopHover={() => {
                  setPhrase("Beenden");
                  PhraseColor.current = "text-red-500";
                }}
                onPauseHover={() => {
                  setPhrase("Pause");
                  PhraseColor.current = "text-yellow-500";
                }}
                onUnhover={() => {
                  setPhrase("Actions");
                  PhraseColor.current = "text-white";
                }}
              />
            </SwitchProvider>
          </div>
        </div>
      </TimerContextProvider>
    </div>
  );
}

export default UserMenu;
