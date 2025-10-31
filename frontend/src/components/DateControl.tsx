import ExtendButton from "./ExtendButton";
import Arrow from "./SVGs/Arrow.tsx";

type DateControlProps = {};

function DateControl() {
  return (
    <div className="w-fit h-11 bg-gray-800 border-gray-950 border-1 rounded-md grid grid-cols-[auto_1fr_auto] grid-rows-1 gap-2 text-nowrap place-content-center">
      <ExtendButton
        className="w-full"
        content={<Arrow color="white" rotate={0} size={25} />}
      />
      <span className="text-white self-center">20.02.2025 - 27.02.2025</span>
      <ExtendButton
        className="w-full"
        content={<Arrow color="white" rotate={180} size={25} />}
      />
    </div>
  );
}

export default DateControl;
