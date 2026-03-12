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
): [Array<Item>, () => void, () => void, boolean] {
  const [items, setItems] = useState(Array<Item>());
  const [hasMore, setHasMore] = useState(true);

  const addOnTop = useCallback(() => {
    if (!hasMore) return;

    const e = handleUpdate();
    setItems((prev) => [...prev, ...e.items]);
    setHasMore(e.hasMore);
  }, [hasMore, handleUpdate, items]);

  const addOnBottom = useCallback(() => {
    if (!hasMore) return;

    const e = handleUpdate();
    setItems((prev) => [...e.items, ...prev]);
    setHasMore(e.hasMore);
  }, [hasMore, handleUpdate, items]);

  useEffect(() => {
    const e = handleUpdate();
    setItems(e.items);
    setHasMore(e.hasMore);
  }, []);

  return [items, addOnTop, addOnBottom, hasMore];
}
