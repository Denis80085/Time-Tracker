type TimerBlockProps = {
  valueType: string;
  value: number;
};

function TimerBlock({ valueType, value }: TimerBlockProps) {
  return (
    <div>
      <p>{`${value < 10 ? "0" + value : value}${valueType}`}</p>
    </div>
  );
}

export default TimerBlock;
