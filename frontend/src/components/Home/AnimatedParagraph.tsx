import { useEffect, useState } from "react";
type AnimatedParagraphProps = {
  content: string;
  speed: number;
  color: string;
};

function AnimatedParagraph({ content, speed, color }: AnimatedParagraphProps) {
  const [displayedContent, setDisplayedContent] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    /*Create a new setInterval and store its id*/
    setIndex(0);
    setDisplayedContent("");
    const animKey = setInterval(() => {
      setIndex((index) => {
        /*This setState function will set the index
        to index+1 if there is more content otherwise
        it will destory this animation*/

        if (index >= content.length) {
          clearInterval(animKey);
          return index;
        }
        return index + 1;
      });
    }, speed);
  }, [content, speed]);

  useEffect(() => {
    setDisplayedContent(() => content.substring(0, index));
  }, [index, content]);

  return (
    <pre
      className={`${color} text-6xl h-15 w-full text-center transition-all duration-150`}
    >
      {displayedContent}
    </pre>
  );
}

export default AnimatedParagraph;
