import { createContext, useContext, type ReactNode, useState } from "react";

type SwitchPadProps = {
  left: ReactNode;
  right: ReactNode;
};

type SwitchPadContextType = {
  position: number;
  moveTo: (pos: number) => void;
};

export const SwitchPadContext = createContext<SwitchPadContextType>({
  position: 0,
  moveTo: () => {},
});

export function SwitchProvider({ children }: { children?: ReactNode }) {
  const [position, setPosition] = useState(0);
  const moveTo = (position: number) => {
    setPosition(position);
  };

  return (
    <SwitchPadContext.Provider value={{ position, moveTo }}>
      {children}
    </SwitchPadContext.Provider>
  );
}

export function SwitchPad({ left, right }: SwitchPadProps) {
  const { position } = useContext(SwitchPadContext);

  return (
    <div className="relative w-full h-full overflow-clip py-1">
      <div
        className={
          "absolute w-full " + (position == 0 ? "left-0" : "left-[100%]")
        }
      >
        {left}
      </div>
      <div
        className={
          "absolute w-full " + (position != 0 ? "left-0" : "left-[100%]")
        }
      >
        {right}
      </div>
    </div>
  );
}
