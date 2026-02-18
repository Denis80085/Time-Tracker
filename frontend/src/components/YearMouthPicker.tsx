import WheelSelect from "./WheelSelect.tsx";

type YMPProps = {
  year?: number;
  month?: number;
  className?: string;
  onSubmit?: (date: Date) => void;
};

function YearMouthPicker({ year, month, onSubmit, ...props }: YMPProps) {
  if (!year) year = new Date().getFullYear();
  if (!month) month = new Date().getMonth();

  const Months: Record<number, string> = {
    0: "Januar",
    1: "Februar",
    2: "März",
    3: "April",
    4: "Mai",
    5: "Juni",
    6: "Juli",
    7: "August",
    8: "September",
    9: "Oktober",
    10: "November",
    11: "Dezember",
  };

  return (
    <div
      className={`grid grid-cols-1 grid-rows-[1fr_auto] place-items-center py-4 ${props.className ?? ""}`}
    >
      <div className="w-full flex justify-around items-center">
        <WheelSelect options={Object.values(Months)} displayAtOnce={5} />
        <span>{year}</span>
      </div>
      <div className="">
        <button className="bg-gray-900 text-white rounded-md px-2 py-1">
          {/*TODO: Replace with own custom buttons*/}
          Submit
        </button>
        <button className="bg-gray-900 text-white rounded-md px-2 py-1">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default YearMouthPicker;
