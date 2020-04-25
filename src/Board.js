import React from "react";
import { Number } from "./Elements";

const Board = ({ data, showHints }) => {
  const { color, numbers } = data;

  return (
    <div
      role="alert"
      className="rounded overflow-hidden shadow-lg m-8 max-w-md"
    >
      <div className={`bg-${color || "gray"}-500 py-2`} />
      <div className={`bg-${color || "gray"}-100 p-4`}>
        {numbers.map(item => (
          <Number
            key={item.number}
            color={color}
            active={item.active && showHints}
          >
            {item.number}
          </Number>
        ))}
      </div>
    </div>
  );
};

export default Board;
