import { useState, useEffect, useRef } from "react";

function getItemsWindow(options: Array<string>, start: number, end: number) {
  if (start > end) {
    let result = Array<string>();
    for (let i = start; i < options.length; i++) {
      result.push(options[i]);
    }
    for (let i = 0; i <= end; i++) {
      result.push(options[i]);
    }
    return result;
  }

  return options.slice(start, end);
}

function useCycleWheelView(
  options: Array<string>,
  n: number,
): [Array<string>, () => void, () => void] {
  const [itemsWindow, setItemsWindow] = useState(Array<string>);
  const Range = useRef({ start: 0, end: n });

  useEffect(() => {
    setItemsWindow(() => options.slice(Range.current.start, Range.current.end));
  }, []);

  const next = () => {
    let newStart = Range.current.start + 1;
    let newEnd = Range.current.end + 1;

    if (newStart > options.length) newStart = 0;
    if (newEnd > options.length) newEnd = 0;

    Range.current = { start: newStart, end: newEnd };

    setItemsWindow(() =>
      getItemsWindow(options, Range.current.start, Range.current.end),
    );
  };
  const prev = () => {
    let newEnd = Range.current.end - 1;
    let newStart = Range.current.start - 1;

    if (newStart < 0) newStart = options.length;
    if (newEnd < 0) newEnd = options.length;

    Range.current = { start: newStart, end: newEnd };

    setItemsWindow(() =>
      getItemsWindow(options, Range.current.start, Range.current.end),
    );
  };

  return [itemsWindow, next, prev];
}

export { useCycleWheelView };
