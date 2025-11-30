import { createContext, useContext, type ReactNode, useState } from "react";
import { motion } from "framer-motion";

type SwitchPadProps = {
  left: ReactNode;
  right: ReactNode;
  switchDuration?: number;
};

type SwitchPadContextType = {
  isLeftVisible: boolean;
  Swap: () => void;
};

export const SwitchPadContext = createContext<SwitchPadContextType>({
  isLeftVisible: true,
  Swap: () => {},
});

export function SwitchProvider({ children }: { children?: ReactNode }) {
  const [isLeftVisible, setIsLeftVisible] = useState(true);
  const Swap = () => {
    setIsLeftVisible((prev) => !prev);
  };

  return (
    <SwitchPadContext.Provider value={{ isLeftVisible, Swap }}>
      {children}
    </SwitchPadContext.Provider>
  );
}

export function SwitchPad({
  left,
  right,
  switchDuration = 0.2,
}: SwitchPadProps) {
  const { isLeftVisible } = useContext(SwitchPadContext);
  const [isSwapping, setIsSwapping] = useState(false);

  const animateSwap = (animateFor: "l" | "r" = "l") => {
    if (isLeftVisible) {
      if (animateFor === "l") return { left: 0 };
      else return { left: "100%" };
    } else {
      if (animateFor === "r") return { left: 0 };
      else return { left: "-100%" };
    }
  };

  return (
    <div className="relative w-full h-full overflow-clip py-1">
      <div
        className={`absolute w-full h-full z-50 left-0 top-0 cursor-default ${isSwapping ? "visible" : "hidden"}`}
      ></div>
      <motion.div
        transition={{
          type: "spring",
          duration: switchDuration,
        }}
        animate={animateSwap("l")}
        className={"absolute w-full z-30"}
        onAnimationStart={() => setIsSwapping(true)}
        onAnimationComplete={() => setIsSwapping(false)}
      >
        {left}
      </motion.div>
      <motion.div
        transition={{
          type: "spring",
          duration: switchDuration,
        }}
        animate={animateSwap("r")}
        className={"absolute w-full z-30"}
        onAnimationStart={() => setIsSwapping(true)}
        onAnimationComplete={() => setIsSwapping(false)}
      >
        {right}
      </motion.div>
    </div>
  );
}
