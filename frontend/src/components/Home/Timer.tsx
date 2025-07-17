import TimerBlock from "./TimerBlock";

function Timer() {
  return (
    <div>
      <TimerBlock value={0} valueType={"s"} />
      <TimerBlock value={0} valueType={"m"} />
      <TimerBlock value={0} valueType={"h"} />
    </div>
  );
}

export default Timer;
