import React, { useEffect } from "react";
import BoardNumber from "./BoardNumber";

const Board = ({ data, showHints, setWinner }) => {
  const { color, numbers } = data;
  const pending = numbers.filter(item => !item.active).length;

  useEffect(() => {
    if (pending === 0) setWinner(color);
  }, [color, setWinner, pending]);

  return (
    <div role="alert" className="rounded overflow-hidden shadow-lg m-4">
      <div className={`bg-${color || "gray"}-500 py-2`} />
      <div className={`bg-${color || "gray"}-100 p-3 grid grid-cols-5 gap-1`}>
        {numbers.map(item => (
          <BoardNumber
            key={item.id}
            number={item.id}
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
