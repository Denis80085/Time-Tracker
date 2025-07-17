import MenuButton from "./MenuButton";
import { useState } from "react";
import AnimatedParagraph from "./AnimatedParagraph";
import Timer from "./Timer";

function UserMenu() {
  const defaultPhrase = "Actions";
  const [Phrase, setPhrase] = useState(defaultPhrase);
  const [PhraseColor, setPhraseColor] = useState("text-white");

  function HandelHover(Phrase: string, PhraseColor: string) {
    setPhraseColor(PhraseColor);
    setPhrase(Phrase);
  }

  function HandelMouseLeave() {
    setPhrase(defaultPhrase);
    setPhraseColor("text-white");
  }

  return (
    <div className="mx-auto my-auto  w-1/3 space-y-4">
      <AnimatedParagraph content={Phrase} speed={30} color={PhraseColor} />
      <Timer />
      <div className="w-full flex justify-center space-x-1.5">
        <MenuButton
          Type="Start"
          OnMouseLeave={() => {
            HandelMouseLeave();
          }}
          OnHover={() => {
            HandelHover("Start Timer", "text-green-500");
          }}
        />
        <MenuButton
          Type="Pause"
          OnMouseLeave={() => {
            HandelMouseLeave();
          }}
          OnHover={() => {
            HandelHover("Pause Timer", "text-yellow-300");
          }}
        />
        <MenuButton
          Type="Stop"
          OnMouseLeave={() => {
            HandelMouseLeave();
          }}
          OnHover={() => {
            HandelHover("Stop Timer", "text-red-600");
          }}
        />
      </div>
    </div>
  );
}

export default UserMenu;
