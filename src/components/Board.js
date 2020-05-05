import React, { useEffect } from "react";
import BoardItem from "./BoardItem";

const Board = ({ data, setWinner, useImages }) => {
  const { color, numbers } = data;
  const pending = numbers.filter(item => !item.active).length;

  useEffect(() => {
    if (pending === 0) setWinner(color);
  }, [color, setWinner, pending]);

  return (
    <div
      role="alert"
      className="rounded overflow-hidden shadow-lg sm:m-4 lg:m-6"
    >
      <div className={`bg-${color || "gray"}-500 py-2`} />
      <div
        className={`bg-${color || "gray"}-100 p-3 grid grid-cols-${
          useImages ? 3 : 5
        } gap-1`}
      >
        {numbers.map(item => (
          <BoardItem key={item.id} item={item} color={color} />
        ))}
      </div>
    </div>
  );
};

export default Board;
