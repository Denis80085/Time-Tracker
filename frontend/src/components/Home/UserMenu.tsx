import MenuButton from "./MenuButton";
import { useState } from "react";
import AnimatedParagraph from "./AnimatedParagraph";
import Timer from "./Timer";
import { startSession, finishSession } from "../../services/WorkSesionService";

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

  const StopButtons = () => {
    return (
      <>
        <MenuButton
          Type="Pause"
          OnMouseLeave={() => {
            HandelMouseLeave();
          }}
          OnHover={() => {
            HandelHover("Pause", "yellow-300");
          }}
          OnClick={() => {
            setStartTimer(false);
            setPauseTimer(true);
            setStopTimer(false);
          }}
        />
        <MenuButton
          Type="Stop"
          OnMouseLeave={() => {
            HandelMouseLeave();
          }}
          OnHover={() => {
            HandelHover("Beenden", "red-600");
          }}
          OnClick={() => {
            setStopTimer(true);
            setPauseTimer(false);
            setStartTimer(false);
          }}
        />
      </>
    );
  };

  const StartButtons = () => {
    return (
      <>
        <MenuButton
          Type="Start"
          OnMouseLeave={() => {
            HandelMouseLeave();
          }}
          OnHover={() => {
            HandelHover("Starten", "green-500");
          }}
          OnClick={() => {
            setStartTimer(true);
            setPauseTimer(false);
            setStopTimer(false);
          }}
        />
        <MenuButton
          Type={"Diverse"}
          OnHover={() => HandelHover("Sonstiges", "violet-500")}
          OnMouseLeave={() => {
            HandelMouseLeave();
          }}
          OnClick={() => {}}
        />
      </>
    );
  };

  return (
    <div
      className={
        "w-1/3 flex flex-wrap items-center justify-center " + className
      }
    >
      <AnimatedParagraph content={Phrase} speed={40} color={PhraseColor} />

      <div className="grid grid-rows-[auto,1fr] grid-cols-[0.5fr] space-y-2 space-x-1.5">
        <Timer
          started={StarTimer}
          paused={PauseTimer}
          stoped={StopTimer}
          border={TimerBorderColor}
        />
        <div className="flex justify-center items-center px-1 space-x-2">
          {StarTimer ? StopButtons() : StartButtons()}
        </div>
      </div>
    </div>
  );
}

export default UserMenu;
