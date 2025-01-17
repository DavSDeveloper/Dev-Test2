import { useState } from "react";

const Tooltip = ({ text, children, position }) => {
  const [show, setShow] = useState(false);

  const positionStyles = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
  };

  return (
    <div
      className="relative inline-block gap-2"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div
          className={`absolute ${positionStyles[position]} w-36 bg-blue-500 text-white text-sm text-center rounded-md shadow-lg p-2 z-10 transition-opacity duration-200 ease-in-out`}
        >
          {text}
          <div
            className={`absolute w-0 h-0 border-[8px] ${
              position === "top"
                ? "bottom-[-15px] left-[46%] transform -translate-x-1/2 border-t-blue-500 border-transparent"
                : position === "bottom"
                ? "top-[-15px] left-[46%] transform -translate-x-1/2 border-b-blue-500 border-transparent"
                : position === "left"
                ? "right-[-15px] top-[46%] transform -translate-y-1/2 border-l-blue-500 border-transparent"
                : "left-[-15px] top-[46%] transform -translate-y-1/2 border-r-blue-500 border-transparent"
            }`}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
