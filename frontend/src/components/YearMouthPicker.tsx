import WheelSelect from "./WheelSelect.tsx";
import {
  useInfiniteList,
  type UpdateResult,
} from "../hooks/useInfiniteList.ts";
import { useRef, useState, useCallback } from "react";

type YMPProps = {
  year?: number;
  month?: number;
  className?: string;
  onSubmit?: (date: Date) => void;
};

function YearMouthPicker({ year, month, onSubmit, ...props }: YMPProps) {
  if (!year) year = new Date().getFullYear();
  if (!month) month = new Date().getMonth();

  const [yearFirst, setYearFirst] = useState(year);
  const handelUpdate = () => {
    let res: UpdateResult = { hasMore: true, items: [] };

    for (let i = 20; i > 0; i--) {
      res.items.push({
        id: yearFirst - i,
        value: yearFirst - i,
        label: String(yearFirst - i),
      });
    }
    for (let i = 0; i < 20; i++) {
      res.items.push({
        id: yearFirst + i,
        value: yearFirst + i,
        label: String(yearFirst + i),
      });
    }

    setYearFirst((prev) => {
      return prev + 20;
    });

    return res;
  };

  const [items, triggerUpdate] = useInfiniteList(handelUpdate);

  let Months: Record<number, string> = {
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
        <div className="basis-1/2">
          <WheelSelect
            text_color={"green"}
            size={"xl"}
            options={Object.values(Months)}
            displayAtOnce={5}
            selected={month}
          />
        </div>
        <div className="basis-1/2">
          <WheelSelect
            text_color={"yellow"}
            size={"xl"}
            options={items.map((item) => item.label)}
            displayAtOnce={5}
            selected={items ? items.length / 2 : undefined}
            selectionChanged={(i) => {
              if (i == items.length - 6) triggerUpdate();
              console.log(i); // TODO: trigger the update
            }}
          />
        </div>
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
