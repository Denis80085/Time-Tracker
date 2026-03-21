import { useState, useEffect, useRef } from "react";

type Item<T> = {
  scale: number;
  content: T;
  isSelected: boolean;
};

function getItemsContents<T>(options: Array<T>, start: number, end: number) {
  if (start > end) {
    let result = Array<T>();
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

function createItemWindow<T>(contents: Array<T>, mid: number) {
  let result = Array<Item<T>>();

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
  return { window: result, selected: result[mid] };
}

function useCycleWheelView<T>(
  options: Array<T>,
  n: number,
): [
  Array<Item<T>>,
  Item<T> | undefined,
  () => void,
  () => void,
  (index: number) => void,
] {
  const [itemsWindow, setItemsWindow] = useState(Array<Item<T>>);
  const [selectedItem, setSelectedItem] = useState<Item<T>>();
  const Range = useRef({ start: 0, end: n - 1 });

  useEffect(() => {
    const ItemWindow = createItemWindow(
      options.slice(Range.current.start, Range.current.end + 1),
      (n - 1) / 2,
    );

    setItemsWindow(() => ItemWindow.window);
    setSelectedItem(ItemWindow.selected);
  }, [options]);

  const updateWindow = () => {
    const contents = getItemsContents(
      options,
      Range.current.start,
      Range.current.end,
    );

    const ItemWindow = createItemWindow(contents, (n - 1) / 2);

    setItemsWindow(() => ItemWindow.window);
    setSelectedItem(ItemWindow.selected);
  };

  const select = (index: number) => {
    let b = Math.floor((n - 1) / 2);

    let newStart = index - b;
    if (newStart < 0) newStart = newStart + options.length;

    let newEnd = index + b;
    if (newEnd >= options.length) newEnd = newEnd - options.length;

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

  return [itemsWindow, selectedItem, next, prev, select];
}

export { useCycleWheelView };
