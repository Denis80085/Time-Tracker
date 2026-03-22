import WheelSelect from "./WheelSelect.tsx";
import {
  useInfiniteList,
  type UpdateResult,
} from "../hooks/useInfiniteList.ts";
import { useRef, useMemo, useCallback } from "react";
import Button from "./Button.tsx";

type YMPProps = {
  year?: number;
  month?: number;
  className?: string;
  onSubmit?: (YearMonth: Pick<YMPProps, "year" | "month">) => void;
  onCancel?: () => void;
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
  const selectedYearIndex = useRef(-1);

  const monthRef = useRef(month);
  const yearRef = useRef(year);

  const handelUpdate = useCallback(() => {
    let res: UpdateResult = { hasMore: true, items: [] };

    let load = loadYears.current;
    for (let i = load.from; i <= load.to; i++) {
      res.items.push({
        id: i - load.from,
        value: i,
        label: String(i),
      });
    }

    if (selectedYearIndex.current < 0)
      selectedYearIndex.current = Math.floor(res.items.length / 2);

    return res;
  }, [loadYears, selectedYearIndex]);

  const [items, addOnTop, addOnBottom] = useInfiniteList(handelUpdate);

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

  const MonthsOptions = useMemo(() => {
    let res = [];
    for (let i = 0; i < 12; i++) {
      res.push({
        index: i,
        value: i,
        label: Months[i],
      });
    }
    return res;
  }, []);

  return (
    <div
      className={`grid grid-cols-1 grid-rows-[1fr_auto] place-items-center py-4 ${props.className ?? ""}`}
    >
      <div className="w-full flex justify-around items-center">
        <div className="basis-1/2">
          {
            <WheelSelect
              text_color={"green"}
              size={"xl"}
              options={MonthsOptions}
              displayAtOnce={5}
              selected={monthRef.current}
              selectionChanged={(o) => {
                if (o === undefined) return;
                monthRef.current = o.value;
              }}
            />
          }
        </div>
        <div className="basis-1/2">
          <WheelSelect
            text_color={"yellow"}
            size={"xl"}
            options={items.map((item, i) => {
              return {
                label: item.label,
                value: item.value,
                index: i,
              };
            })}
            displayAtOnce={5}
            selected={selectedYearIndex.current}
            selectionChanged={(o) => {
              if (o === undefined) return;
              yearRef.current = o.value;
              let bottomTriger = 2;
              let topTriger = items.length - 3;
              selectedYearIndex.current = o.index;

              if (o.index >= topTriger) {
                loadYears.current.from = items[items.length - 1].value + 1;
                loadYears.current.to = items[items.length - 1].value + 10;
                addOnTop();
              }
              if (o.index <= bottomTriger) {
                loadYears.current.to = items[0].value - 1;
                loadYears.current.from = items[0].value - 10;
                selectedYearIndex.current += 10;
                addOnBottom();
              }
            }}
          />
        </div>
      </div>
      <div className="mt-1.5 w-full flex justify-center items-center gap-x-3">
        <Button
          variant="green"
          size="medium"
          onClick={() =>
            onSubmit?.({ year: yearRef.current, month: monthRef.current })
          }
        >
          SUBMIT
        </Button>
        <Button variant="red" size="medium" onClick={props.onCancel}>
          CANCEL
        </Button>
      </div>
    </div>
  );
}

export default YearMouthPicker;
