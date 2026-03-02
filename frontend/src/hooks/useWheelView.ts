import { useState, useEffect, useRef } from "react";

type Item = {
  scale: number;
  content: string;
  isSelected?: boolean;
};

function getItemsContents(options: Array<string>, start: number, end: number) {
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

function createItemWindow(contents: Array<string>, mid: number) {
  let result = Array<Item>();

  for (let i = 0; i < contents.length; i++) {
    const d = Math.abs(i - mid);
    const t = d / mid;
    const scale = 100 - 20 * t;

    result.push({
      scale: scale,
      content: contents[i],
      isSelected: i === mid,
    });
  }
  return result;
}

function useCycleWheelView(
  options: Array<string>,
  n: number,
): [Array<Item>, () => void, () => void] {
  const [itemsWindow, setItemsWindow] = useState(Array<Item>);
  const Range = useRef({ start: 0, end: n });

  useEffect(() => {
    setItemsWindow(() =>
      createItemWindow(
        options.slice(Range.current.start, Range.current.end),
        (n - 1) / 2,
      ),
    );
  }, []);

  const next = () => {
    let newStart = Range.current.start + 1;
    let newEnd = Range.current.end + 1;

    if (newStart > options.length) newStart = 0;
    if (newEnd > options.length) newEnd = 0;

    Range.current = { start: newStart, end: newEnd };

    const contents = getItemsContents(
      options,
      Range.current.start,
      Range.current.end,
    );

    setItemsWindow(() => createItemWindow(contents, (n - 1) / 2));
  };
  const prev = () => {
    let newEnd = Range.current.end - 1;
    let newStart = Range.current.start - 1;

    if (newStart < 0) newStart = options.length;
    if (newEnd < 0) newEnd = options.length;

    Range.current = { start: newStart, end: newEnd };

    const contents = getItemsContents(
      options,
      Range.current.start,
      Range.current.end,
    );

    setItemsWindow(() => createItemWindow(contents, (n - 1) / 2));
  };

  return [itemsWindow, next, prev];
}

export { useCycleWheelView };
