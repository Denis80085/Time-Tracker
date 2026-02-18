type YMPProps = {
  year?: number;
  month?: number;
  className?: string;
  onSubmit?: (date: Date) => void;
};

function YearMouthPicker({ year, month, onSubmit, ...props }: YMPProps) {
  if (!year) year = new Date().getFullYear();
  if (!month) month = new Date().getMonth();

  return (
    <div
      className={
        "grid grid-rows-[1fr_auto] place-items-center gap-2 " + props.className
      }
    >
      <div>
        <span>its me</span>
      </div>
      <div>
        <button className="bg-gray-900 text-white rounded-md px-2 py-1">
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
