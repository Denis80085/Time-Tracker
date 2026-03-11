import { useState, useEffect, useCallback } from "react";

type Item = {
  id: number;
  value: any;
  label: string;
};

export type UpdateResult = {
  items: Array<Item>;
  hasMore: boolean;
};

export function useInfiniteList(
  handleUpdate: () => UpdateResult,
): [Array<Item>, () => void, boolean] {
  const [items, setItems] = useState(Array<Item>());
  const [hasMore, setHasMore] = useState(true);

  const update = useCallback(() => {
    if (!hasMore) return;

    const e = handleUpdate();
    console.log(e);
    setItems(e.items);
    setHasMore(e.hasMore);
  }, [hasMore, handleUpdate, items]);

  useEffect(() => {
    update();
  }, []);

  return [items, update, hasMore];
}
