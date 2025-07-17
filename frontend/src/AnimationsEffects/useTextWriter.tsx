import { useEffect, useState, useCallback } from "react";

function useTextWriter(description: string) {
  const [text, setText] = useState(" ");

  const animateText = useCallback((direction: any) => {
    const max = description.length;

    for (let index = 0; index < max; index++) {
      const startIndex = direction ? 0 : max;
      const endIndex = direction ? index : max - index;
      setTimeout(() => {
        setText(description.substring(startIndex, endIndex));
      }, index * 50);
    }
  }, []);

  useEffect(() => {
    animateText(true);
  }, [animateText]);

  return text;
}

export default useTextWriter;
