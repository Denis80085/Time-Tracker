import { useState } from "react";

const DatePicker = () => {
  const [gridVisible, setGridVisible] = useState(false);

  return (
    <>
      <div
        className="h-full w-full flex items-center justify-center px-2 cursor-pointer date-picker-anchor"
        onClick={() => setGridVisible(!gridVisible)}
      >
        <span className="text-white text-center">22.12.2025-28.12.2025</span>
      </div>
      <div
        className={`transition-transform duration-200 origin-top w-44 h-20 bg-red-900 dp-grid-position ${
          gridVisible ? "transform scale-y-100 " : "transform scale-y-0"
        }`}
      ></div>
    </>
  );
};

export default DatePicker;
