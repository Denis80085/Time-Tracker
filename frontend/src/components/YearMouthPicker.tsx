import WheelSelect from "./WheelSelect.tsx";
import {
  useInfiniteList,
  type UpdateResult,
} from "../hooks/useInfiniteList.ts";
import { useState, useRef } from "react";

type YMPProps = {
  year?: number;
  month?: number;
  className?: string;
  onSubmit?: (date: Date) => void;
};

function YearMouthPicker({
  year = new Date().getFullYear(),
  month = new Date().getMonth(),
  onSubmit,
  ...props
}: YMPProps) {
  const loadYears = useRef({
    from: year - 10,
    to: year + 10,
  });
  const [yearSelected, setYearSelected] = useState(-1);

  const handelUpdate = () => {
    let res: UpdateResult = { hasMore: true, items: [] };

    let load = loadYears.current;
    for (let i = load.from; i <= load.to; i++) {
      res.items.push({
        id: i - load.from,
        value: i,
        label: String(i),
      });
    }

    if (yearSelected < 0) setYearSelected(Math.floor(res.items.length / 2));

    return res;
  };

  const [items, addOnTop, addOnBottom] = useInfiniteList(handelUpdate);

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
            selected={yearSelected}
            selectionChanged={(o) => {
              if (o.index === -1) return;

              let bottomTriger = 2;
              let topTriger = items.length - 3;

              if (o.index >= topTriger) {
                loadYears.current.from = items[items.length - 1].value + 1;
                loadYears.current.to = items[items.length - 1].value + 10;
                setYearSelected(o.index);
                addOnTop();
              }
              if (o.index <= bottomTriger) {
                loadYears.current.to = items[0].value - 1;
                loadYears.current.from = items[0].value - 10;
                setYearSelected(o.index + 10);
                addOnBottom();
              }
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
