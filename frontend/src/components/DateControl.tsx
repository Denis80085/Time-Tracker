import ExtendButton from "./ExtendButton";
import Arrow from "./SVGs/Arrow.tsx";

type DateControlProps = {
  date: string;
  onRightClick?: () => void;
  onLeftClick?: () => void;
};

function DateControl({ onRightClick, onLeftClick, date }: DateControlProps) {
  return (
    <div className="h-11 bg-gray-800 border-gray-950 border-1 rounded-md grid grid-cols-[auto_1fr_auto] grid-rows-1 gap-2 text-nowrap place-content-center cursor-default">
      <ExtendButton
        onClick={onLeftClick}
        color="gray"
        extend_to="right"
        className="w-full pr-2"
        content={<Arrow color="white" rotate={0} size={30} />}
      />
      <span className="text-white self-center">{date}</span>
      <ExtendButton
        onClick={onRightClick}
        className="w-full pl-2"
        color="gray"
        extend_to="left"
        content={<Arrow color="white" rotate={180} size={30} />}
      />
    </div>
  );
}

export default DateControl;
