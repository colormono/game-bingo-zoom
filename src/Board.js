import React from "react";

const Board = ({ data, showHints }) => {
  const { color, numbers } = data;

  return (
    <div role="alert" className="rounded overflow-hidden shadow-lg my-12">
      <div className={`bg-${color || "gray"}-500 px-4 py-2`} />
      <div
        className={`bg-${color || "gray"}-100 px-4 py-3 text-${color ||
          "gray"}-700`}
      >
        {numbers.map(item => {
          return (
            <span
              key={item.number}
              className={`number ${
                item.active && showHints ? "number--active" : "number--regular"
              }`}
            >
              {item.number}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Board;
