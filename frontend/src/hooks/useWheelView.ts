import { useState, useEffect, useRef } from "react";

type Item = {
  scale: number;
  content: string;
  isSelected: boolean;
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

  return options.slice(start, end + 1);
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
): [Array<Item>, () => void, () => void, (index: number) => void] {
  const [itemsWindow, setItemsWindow] = useState(Array<Item>);
  const Range = useRef({ start: 0, end: n - 1 });

  useEffect(() => {
    setItemsWindow(() =>
      createItemWindow(
        options.slice(Range.current.start, Range.current.end + 1),
        (n - 1) / 2,
      ),
    );
  }, []);

  const updateWindow = () => {
    const contents = getItemsContents(
      options,
      Range.current.start,
      Range.current.end,
    );

    setItemsWindow(() => createItemWindow(contents, (n - 1) / 2));
  };

  const select = (index: number) => {
    let b = (n - 1) / 2;

    let newStart = index - b;
    if (newStart < 0) newStart = newStart + options.length;

    let newEnd = index + b;
    if (newEnd >= options.length) newEnd = newEnd - options.length;

    console.log(newStart, newEnd);
    Range.current = { start: newStart, end: newEnd };
    updateWindow();
  };

  const next = () => {
    let newStart = Range.current.start + 1;
    let newEnd = Range.current.end + 1;

    if (newStart > options.length - 1) newStart = 0;
    if (newEnd > options.length - 1) newEnd = 0;

    Range.current = { start: newStart, end: newEnd };

    updateWindow();
  };
  const prev = () => {
    let newEnd = Range.current.end - 1;
    let newStart = Range.current.start - 1;

    if (newStart < 0) newStart = options.length - 1;
    if (newEnd < 0) newEnd = options.length - 1;

    Range.current = { start: newStart, end: newEnd };

    updateWindow();
  };

  return [itemsWindow, next, prev, select];
}

export { useCycleWheelView };
