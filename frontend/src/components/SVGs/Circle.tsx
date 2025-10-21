type CircleProps = {
  width: number;
  height: number;
  color: string;
};

function Circle({ width, height, color }: CircleProps) {
  return (
    <svg
      viewBox="-1.6 -1.6 19.20 19.20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <circle
          cx="8"
          cy="8"
          r="8"
          fill={color}
          className={"transition-colors duration-300"}
        ></circle>{" "}
      </g>
    </svg>
  );
}

export default Circle;
