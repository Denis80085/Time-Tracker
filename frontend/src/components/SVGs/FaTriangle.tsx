type FaTriangleProps = {
  size: number;
  rotate: string;
};

const FaTriangle = ({ size, rotate }: FaTriangleProps) => {
  const rotationConverter: { [key: string]: string } = {
    "0": "rotate-forwards-0",
    "45": "rotate-forwards-45",
    "90": "rotate-forwards-90",
    "135": "rotate-forwards-135",
    "180": "rotate-forwards-180",
    "225": "rotate-forwards-225",
    "270": "rotate-forwards-270",
    "315": "rotate-forwards-315",
    "360": "rotate-forwards-360",
    "-45": "rotate-backwards-45",
    "-90": "rotate-backwards-90",
    "-135": "rotate-backwards-135",
    "-180": "rotate-backwards-180",
    "-225": "rotate-backwards-225",
    "-270": "rotate-backwards-270",
    "-315": "rotate-backwards-315",
    "-360": "rotate-backwards-360",
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      className={"bi bi-caret-right-fill " + rotationConverter[rotate]}
      viewBox="0 0 16 16"
    >
      <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
    </svg>
  );
};

export default FaTriangle;
