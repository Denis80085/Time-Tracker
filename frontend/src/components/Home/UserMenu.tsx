import MenuButton from "./MenuButton";
import { useState } from "react";
import AnimatedParagraph from "./AnimatedParagraph";
import Timer from "./Timer";
import { startSession, finishSession } from "../../services/WorkSesionService";

function UserMenu() {
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

  return (
    <div className="mx-auto my-auto  w-1/3 space-y-4">
      <AnimatedParagraph content={Phrase} speed={30} color={PhraseColor} />
      <Timer
        started={StarTimer}
        paused={PauseTimer}
        stoped={StopTimer}
        border={TimerBorderColor}
      />
      <div className="w-full flex justify-center space-x-1.5">
        <MenuButton
          Type="Start"
          OnMouseLeave={() => {
            HandelMouseLeave();
          }}
          OnHover={() => {
            HandelHover("Start Timer", "green-500");
          }}
          OnClick={() => {
            setStartTimer(true);
            setPauseTimer(false);
            setStopTimer(false);
            startSession();
          }}
        />
        <MenuButton
          Type="Pause"
          OnMouseLeave={() => {
            HandelMouseLeave();
          }}
          OnHover={() => {
            HandelHover("Pause Timer", "yellow-300");
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
            HandelHover("Stop Timer", "red-600");
          }}
          OnClick={() => {
            setStopTimer(true);
            setPauseTimer(false);
            setStartTimer(false);
            let id = localStorage.getItem("currentSessionId");
            if (id) finishSession(id);
          }}
        />
      </div>
    </div>
  );
}

export default UserMenu;
