import React from "react";
import BoardNumber from "./BoardNumber";

const Board = ({ data, showHints }) => {
  const { color, numbers } = data;

  return (
    <div role="alert" className="rounded overflow-hidden shadow-lg m-4">
      <div className={`bg-${color || "gray"}-500 py-2`} />
      <div className={`bg-${color || "gray"}-100 p-2 grid grid-cols-5 gap-1`}>
        {numbers.map(item => (
          <BoardNumber
            key={item.number}
            number={item.number}
            color={color}
            showHints={showHints}
            active={item.active && showHints}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
