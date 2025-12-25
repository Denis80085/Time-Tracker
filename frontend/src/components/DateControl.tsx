import ExtendButton from "./ExtendButton";
import Arrow from "./SVGs/Arrow.tsx";

type DateControlProps = {
  date: string;
  onRightClick?: () => void;
  onLeftClick?: () => void;
};

function DateControl({ onRightClick, onLeftClick, date }: DateControlProps) {
  return (
    <div className="h-11 bg-gray-900 border-gray-950 border-1 rounded-md grid grid-cols-[auto_1fr_auto] grid-rows-1 text-nowrap place-content-center cursor-default">
      <ExtendButton
        onClick={onLeftClick}
        color="gray"
        extend_to="right"
        className="w-full pr-2 border-1 transition-colors duration-250 border-zinc-950 hover:bg-gray-800"
        content={<Arrow color="white" rotate={0} size={30} />}
      />
      <div className="h-full w-full flex items-center justify-center px-2 border-1 border-zinc-950 transition-colors duration-250 hover:bg-gray-800">
        <span className="text-white text-center">{date}</span>
      </div>
      <ExtendButton
        onClick={onRightClick}
        className="w-full pl-2 border-1 transition-colors duration-250 border-zinc-950 hover:bg-gray-800"
        color="gray"
        extend_to="left"
        content={<Arrow color="white" rotate={180} size={30} />}
      />
    </div>
  );
}

export default DateControl;
